import Audio from "#/models/audio";
import Favorite from "#/models/favorite";
import { RequestHandler } from "express";
import { isValidObjectId } from "mongoose";

export const toggleFavorite: RequestHandler = async (req, res) => {
  const audioId = req.query.audioId as string;
  let status: "added" | "removed";

  // Check if audioId is in the expected structure of a MongoDB ObjectID
  if (!isValidObjectId(audioId))
    return res.status(422).json({ error: "Audio id is invalid!" });

  // Find the audio
  const audio = await Audio.findById(audioId);
  if (!audio) return res.status(404).json({ error: "Resources not found!" });

  // audio is already in favorite
  const alreadyExists = await Favorite.findOne({
    owner: req.user.id,
    items: audioId,
  });

  if (alreadyExists) {
    // remove audio from old lists
    await Favorite.updateOne(
      { owner: req.user.id },
      {
        $pull: { items: audioId },
      }
    );

    status = "removed";
  } else {
    const favorite = await Favorite.findOne({ owner: req.user.id });
    if (favorite) {
      // trying to add new audio to the old list
      await Favorite.updateOne(
        { owner: req.user.id },
        {
          $addToSet: { items: audioId },
        }
      );
    } else {
      // trying to create fresh favorite list
      await Favorite.create({ owner: req.user.id, items: [audioId] });
    }

    status = "added";
  }

  if (status === "added") {
    await Audio.findByIdAndUpdate(audioId, {
      $addToSet: { likes: req.user.id },
    });
  }

  if (status === "removed") {
    await Audio.findByIdAndUpdate(audioId, {
      $pull: { likes: req.user.id },
    });
  }

  res.json({ status });
};
