import { RequestHandler } from "express";
import { ObjectId, PipelineStage, isValidObjectId } from "mongoose";
import User from "#/models/user";
import { paginationQuery } from "#/@types/misc";
import Audio, { AudioDocument } from "#/models/audio";
import Playlist from "#/models/playlist";
import History from "#/models/history";
import moment from "moment";

export const updateFollower: RequestHandler = async (req, res) => {
  const { profileId } = req.params;
  let status: "added" | "removed";

  // Check if profileId is a valid object id OR profileId is now the authenticated user
  if (!isValidObjectId(profileId) || profileId === req.user.id.toString())
    return res.status(422).json({ error: "Invalid profile id!" });

  const profile = await User.findById(profileId);
  if (!profile) return res.status(404).json({ error: "Profile not found!" });

  const alreadyAFollower = await User.findOne({
    _id: profileId,
    followers: req.user.id,
  });

  if (alreadyAFollower) {
    // un follow
    await User.updateOne(
      {
        _id: profileId,
      },
      {
        $pull: { followers: req.user.id },
      }
    );

    status = "removed";
  } else {
    // follow the user
    await User.updateOne(
      {
        _id: profileId,
      },
      {
        $addToSet: { followers: req.user.id },
      }
    );

    status = "added";
  }

  if (status === "added") {
    // update the following list (add)
    await User.updateOne(
      { _id: req.user.id },
      { $addToSet: { followings: profileId } }
    );
  }

  if (status === "removed") {
    // remove from the following list (remove)
    await User.updateOne(
      { _id: req.user.id },
      { $pull: { followings: profileId } }
    );
  }

  res.json({ status });
};

export const getUploads: RequestHandler = async (req, res) => {
  const { limit = "20", pageNo = "0" } = req.query as paginationQuery;

  const data = await Audio.find({ owner: req.user.id })
    .skip(parseInt(limit) * parseInt(pageNo))
    .limit(parseInt(limit))
    .sort("-createdAt");

  const audios = data.map((item) => {
    return {
      id: item._id,
      title: item.title,
      about: item.about,
      file: item.file.url,
      poster: item.poster?.url,
      date: item.createdAt,
      owner: { name: req.user.name, id: req.user.id },
    };
  });

  res.json({ audios });
};

export const getPublicUploads: RequestHandler = async (req, res) => {
  const { limit = "20", pageNo = "0" } = req.query as paginationQuery;
  const { profileId } = req.params;

  // Check if profileId is a valid object id
  if (!isValidObjectId(profileId))
    return res.status(422).json({ error: "Invalid profile id!" });

  const data = await Audio.find({ owner: profileId })
    .skip(parseInt(limit) * parseInt(pageNo))
    .limit(parseInt(limit))
    .sort("-createdAt")
    .populate<AudioDocument<{ name: string; _id: ObjectId }>>("owner");

  const audios = data.map((item) => {
    return {
      id: item._id,
      title: item.title,
      about: item.about,
      file: item.file.url,
      poster: item.poster?.url,
      date: item.createdAt,
      owner: { name: item.owner.name, id: item.owner._id },
    };
  });

  res.json({ audios });
};

export const getPublicProfile: RequestHandler = async (req, res) => {
  const { profileId } = req.params;

  if (!isValidObjectId(profileId))
    return res.status(422).json({ error: "Invalid profile id!" });

  const user = await User.findById(profileId);
  if (!user) return res.status(422).json({ error: "User not found!" });

  res.json({
    profile: {
      id: user._id,
      name: user.name,
      followers: user.followers.length,
      avatar: user.avatar?.url,
    },
  });
};

export const getPublicPlaylist: RequestHandler = async (req, res) => {
  const { profileId } = req.params;
  const { limit = "20", pageNo = "0" } = req.query as paginationQuery;

  if (!isValidObjectId(profileId))
    return res.status(422).json({ error: "Invalid profile id!" });

  const playlist = await Playlist.find({
    owner: profileId,
    visibility: "public",
  })
    .skip(parseInt(limit) * parseInt(pageNo))
    .limit(parseInt(limit))
    .sort("-createdAt");

  if (!playlist) return res.json({ playlist: [] });

  res.json({
    playlist: playlist.map((item) => {
      return {
        id: item._id,
        title: item.title,
        itemsCount: item.items.length,
        visibility: item.visibility,
      };
    }),
  });
};

export const getRecommendedByProfile: RequestHandler = async (req, res) => {
  const user = req.user;

  // Default match for not logged in user
  let matchOptions: PipelineStage.Match = {
    $match: { _id: { $exists: true } },
  };

  if (user) {
    // then we want to send by the profile

    // fetch users previous history
    const usersPreviousHistory = await History.aggregate([
      { $match: { owner: user.id } },
      { $unwind: "$all" },
      {
        $match: {
          "all.date": {
            // only those histories which are not older than 30 days
            $gte: moment().subtract(30, "days").toDate(),
          },
        },
      },
      { $group: { _id: "$all.audio" } },
      {
        $lookup: {
          from: "audios",
          localField: "_id",
          foreignField: "_id",
          as: "audioData",
        },
      },
      { $unwind: "$audioData" },
      { $group: { _id: null, category: { $addToSet: "$audioData.category" } } },
    ]);

    const categories = usersPreviousHistory[0].category;
    if (categories.length) {
      matchOptions = { $match: { category: { $in: categories } } };
    }
  }

  // otherwise we will send generic audios
  const audios = await Audio.aggregate([
    matchOptions,
    {
      $sort: {
        "likes.count": -1,
      },
    },
    { $limit: 10 },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
      },
    },
    { $unwind: "$owner" },
    {
      $project: {
        _id: 0,
        id: "$_id",
        title: "$title",
        category: "$category",
        about: "$about",
        file: "$file.url",
        poster: "$poster.url",
        owner: { name: "$owner.name", id: "$owner._id" },
      },
    },
  ]);

  res.json({ audios });
};
