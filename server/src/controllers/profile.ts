import { RequestHandler } from "express";
import { ObjectId, PipelineStage, Types, isValidObjectId } from "mongoose";
import User from "#/models/user";
import { paginationQuery } from "#/@types/misc";
import Audio, { AudioDocument } from "#/models/audio";
import Playlist from "#/models/playlist";
import History from "#/models/history";
import { getUsersPreviousHistory } from "#/utils/helper";
import AutoGeneratedPlaylist from "#/models/autoGeneratedPlaylist";

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
    const category = await getUsersPreviousHistory(req);

    if (category.length) {
      matchOptions = { $match: { category: { $in: category } } };
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

export const getAutoGeneratedPlaylist: RequestHandler = async (req, res) => {
  // find 5 playlist
  // 1 mix 20
  // 4 autoGeneratedPlaylist

  // Create mix 20 audios Playlist
  const [result] = await History.aggregate([
    { $match: { owner: req.user.id } },
    { $unwind: "$all" },
    { $group: { _id: "$all.audio", items: { $addToSet: "$all.audio" } } },
    { $sample: { size: 20 } },
    { $group: { _id: null, items: { $push: "$_id" } } },
  ]);

  const title = "Mix 20";

  if (result) {
    await Playlist.updateOne(
      { owner: req.user.id, title },
      { $set: { title, items: result.items, visibility: "auto" } },
      { upsert: true }
    );
  }

  // 4 autoGeneratedPlaylist
  const category = await getUsersPreviousHistory(req);
  let matchOptions: PipelineStage.Match = {
    $match: { _id: { $exists: true } },
  };

  if (category.length) {
    matchOptions = { $match: { title: { $in: category } } };
  }

  const agpl = await AutoGeneratedPlaylist.aggregate([
    matchOptions,
    { $sample: { size: 4 } },
    {
      $project: {
        _id: 0,
        id: "$_id",
        title: "$title",
        itemsCount: { $size: "$items" },
      },
    },
  ]);

  const playlist = await Playlist.findOne({ owner: req.user.id, title });

  const finalList = agpl.concat({
    id: playlist?._id,
    title: playlist?.title,
    itemsCount: playlist?.items.length,
  });

  res.json({ playlist: finalList });
};

export const getFollowersProfile: RequestHandler = async (req, res) => {
  const { limit = "20", pageNo = "0" } = req.query as paginationQuery;

  const [result] = await User.aggregate([
    { $match: { _id: req.user.id } },
    {
      $project: {
        followers: {
          $slice: [
            "$followers",
            parseInt(pageNo) * parseInt(limit),
            parseInt(limit),
          ],
        },
      },
    },
    { $unwind: "$followers" },
    {
      $lookup: {
        from: "users",
        localField: "followers",
        foreignField: "_id",
        as: "userInfo",
      },
    },
    { $unwind: "$userInfo" },
    {
      $group: {
        _id: null,
        followers: {
          $push: {
            id: "$userInfo._id",
            name: "$userInfo.name",
            avatar: "$userInfo.avatar.url",
          },
        },
      },
    },
  ]);

  if (!result) {
    return result.json({ followers: [] });
  }

  res.json({ followers: result.followers });
};

export const getFollowersProfilePublic: RequestHandler = async (req, res) => {
  const { limit = "20", pageNo = "0" } = req.query as paginationQuery;
  const { profileId } = req.params;

  if (!isValidObjectId(profileId)) {
    return res.status(422).json({ error: "Invalid profile id!" });
  }

  const [result] = await User.aggregate([
    { $match: { _id: new Types.ObjectId(profileId) } },
    {
      $project: {
        followers: {
          $slice: [
            "$followers",
            parseInt(pageNo) * parseInt(limit),
            parseInt(limit),
          ],
        },
      },
    },
    { $unwind: "$followers" },
    {
      $lookup: {
        from: "users",
        localField: "followers",
        foreignField: "_id",
        as: "userInfo",
      },
    },
    { $unwind: "$userInfo" },
    {
      $group: {
        _id: null,
        followers: {
          $push: {
            id: "$userInfo._id",
            name: "$userInfo.name",
            avatar: "$userInfo.avatar.url",
          },
        },
      },
    },
  ]);

  if (!result) {
    return result.json({ followers: [] });
  }

  res.json({ followers: result.followers });
};

export const getFollowingsProfile: RequestHandler = async (req, res) => {
  const { limit = "20", pageNo = "0" } = req.query as paginationQuery;

  const [result] = await User.aggregate([
    { $match: { _id: req.user.id } },
    {
      $project: {
        followings: {
          $slice: [
            "$followings",
            parseInt(pageNo) * parseInt(limit),
            parseInt(limit),
          ],
        },
      },
    },
    { $unwind: "$followings" },
    {
      $lookup: {
        from: "users",
        localField: "followings",
        foreignField: "_id",
        as: "userInfo",
      },
    },
    { $unwind: "$userInfo" },
    {
      $group: {
        _id: null,
        followings: {
          $push: {
            id: "$userInfo._id",
            name: "$userInfo.name",
            avatar: "$userInfo.avatar.url",
          },
        },
      },
    },
  ]);

  if (!result) {
    return result.json({ followings: [] });
  }

  res.json({ followings: result.followings });
};

export const getPlaylistAudios: RequestHandler = async (req, res) => {
  const { limit = "20", pageNo = "0" } = req.query as paginationQuery;

  const { playlistId } = req.params;

  if (!isValidObjectId(playlistId))
    return res.status(422).json({ error: "Invalid playlist id!" });

  const aggregatationLogic = [
    {
      $match: {
        _id: new Types.ObjectId(playlistId),
        visibility: { $ne: "private" },
      },
    },
    {
      $project: {
        items: {
          $slice: [
            "$items",
            parseInt(pageNo) * parseInt(limit),
            parseInt(limit),
          ],
        },
        title: "$title",
      },
    },
    { $unwind: "$items" },
    {
      $lookup: {
        from: "audios",
        localField: "items",
        foreignField: "_id",
        as: "audios",
      },
    },
    { $unwind: "$audios" },
    {
      $lookup: {
        from: "users",
        localField: "audios.owner",
        foreignField: "_id",
        as: "userInfo",
      },
    },
    { $unwind: "$userInfo" },
    {
      $group: {
        _id: {
          id: "$_id",
          title: "$title",
        },
        audios: {
          $push: {
            id: "$audios._id",
            title: "$audios.title",
            about: "$audios.about",
            category: "$audios.category",
            file: "$audios.file.url",
            poster: "$audios.poster.url",
            owner: { name: "$userInfo.name", id: "$userInfo._id" },
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        id: "$_id.id",
        title: "$_id.title",
        audios: "$$ROOT.audios",
      },
    },
  ];

  const [playlistResult] = await Playlist.aggregate(aggregatationLogic);

  //If there is no playlist result then return Auto generated playlist
  if (!playlistResult) {
    const [autoPlaylistResult] = await AutoGeneratedPlaylist.aggregate(
      aggregatationLogic
    );
    return res.json({ list: autoPlaylistResult });
  }

  res.json({ list: playlistResult });
};
