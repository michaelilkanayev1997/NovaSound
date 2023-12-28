import { RequestWithFiles } from "#/middleware/fileParser";
import { categoriesTypes } from "#/utils/audio_category";
import { RequestHandler } from "express";
import formidable from "formidable";
import cloudinary from "#/cloud";
import Audio from "#/models/audio";

interface CreateAudioRequest extends RequestWithFiles {
  body: { title: string; about: string; category: categoriesTypes };
}

export const createAudio: RequestHandler = async (
  req: CreateAudioRequest,
  res
) => {
  const { title, about, category } = req.body;

  const poster = req.files?.poster as formidable.File;
  const audioFile = req.files?.file as formidable.File;
  const ownerId = req.user.id;

  if (!audioFile)
    return res.status(422).json({ error: "Audio file is missing!" });

  const audioRes = await cloudinary.uploader.upload(audioFile.filepath, {
    resource_type: "video",
  });

  const newAudio = new Audio({
    title,
    about,
    category,
    owner: ownerId,
    file: { url: audioRes.url, publicId: audioRes.public_Id },
  });

  if (poster) {
    const posterRes = await cloudinary.uploader.upload(poster.filepath, {
      width: 300,
      height: 300,
      crop: "thumb",
      gravity: "face",
    });

    newAudio.poster = {
      url: posterRes.secure_url,
      publicId: posterRes.public_id,
    };
  }

  await newAudio.save();

  res.status(201).json({
    audio: {
      title,
      about,
      file: newAudio.file.url,
      poster: newAudio.poster?.url,
    },
  });
};
