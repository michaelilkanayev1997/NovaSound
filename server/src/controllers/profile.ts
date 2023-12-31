import { RequestHandler } from "express";
import { isValidObjectId } from "mongoose";
import User from "#/models/user";
import { paginationQuery } from "#/@types/misc";
import Audio from "#/models/audio";

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
