import { Model, model, ObjectId, Schema } from "mongoose";

// interface (typescript)
interface EmailVerificationTokenDocument {
  owner: ObjectId;
  token: string;
  createdAt: Date;
}

const emailVerificationTokenSchema = new Schema<EmailVerificationTokenDocument>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    token: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      expires: 3600, // expire the token after 1 hr (60 min * 60 sec = 3600s)
      default: Date.now(),
    },
  }
);

export default model(
  "EmailVerificationToken",
  emailVerificationTokenSchema
) as Model<EmailVerificationTokenDocument>;
