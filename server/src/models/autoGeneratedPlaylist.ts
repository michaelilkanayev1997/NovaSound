import { Model, ObjectId, Schema, model, models } from "mongoose";

interface AuthPlaylistDocument {
  title: string;
  items: ObjectId[];
}

const playlistSchema = new Schema<AuthPlaylistDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    items: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Audio",
      },
    ],
  },
  { timestamps: true }
);

const AuthGeneratedPlaylist =
  models.AuthGeneratedPlaylist ||
  model("AuthGeneratedPlaylist", playlistSchema);

export default AuthGeneratedPlaylist as Model<AuthPlaylistDocument>;
