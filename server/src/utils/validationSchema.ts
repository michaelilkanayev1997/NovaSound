import * as yup from "yup";
import { isValidObjectId } from "mongoose";
import { categories } from "./audio_category";

export const CreateUserSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Name is missing!")
    .min(3, "Name is too short!")
    .max(20, "Name is too long!"),
  email: yup.string().required("Email is missing!").email("Invalid email !"),
  password: yup
    .string()
    .trim()
    .required("Password is missing!")
    .min(8, "Password is too short!")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])[a-zA-Z\d!@#\$%\^&\*]+$/,
      "Password must contain at least one letter, one number, and one special character (!@#$%^&*)."
    ),
});

export const TokenAndIdValidation = yup.object().shape({
  token: yup.string().trim().required("Invalid token!"),
  userId: yup
    .string()
    .transform(function (value) {
      if (this.isType(value) && isValidObjectId(value)) {
        return value;
      }

      return "";
    })
    .required("Invalid userId!"),
});

export const UpdatePasswordSchema = yup.object().shape({
  token: yup.string().trim().required("Invalid token!"),
  userId: yup
    .string()
    .transform(function (value) {
      if (this.isType(value) && isValidObjectId(value)) {
        return value;
      }

      return "";
    })
    .required("Invalid userId!"),
  password: yup
    .string()
    .trim()
    .required("Password is missing!")
    .min(8, "Password is too short!")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])[a-zA-Z\d!@#\$%\^&\*]+$/,
      "Password must contain at least one letter, one number, and one special character (!@#$%^&*)."
    ),
});

export const SignInValidationSchema = yup.object().shape({
  email: yup.string().required("Email is missing!").email("Invalid email !"),
  password: yup.string().trim().required("Password is missing!"),
});

export const AudioValidationSchema = yup.object().shape({
  title: yup.string().required("Title is missing!"),
  about: yup.string().required("About is missing!"),
  category: yup
    .string()
    .oneOf(categories, "Invalid category!")
    .required("Category is missing!"),
});

export const NewPlaylistValidationSchema = yup.object().shape({
  title: yup.string().required("Title is missing!"),
  resId: yup.string().transform(function (value) {
    return this.isType(value) && isValidObjectId(value) ? value : "";
  }),
  visibility: yup
    .string()
    .oneOf(["public", "private"], "Visibility must be public or private!")
    .required("Visibility is missing!"),
});

export const OldPlaylistValidationSchema = yup.object().shape({
  title: yup.string().required("Title is missing!"),
  // Validate the audio id
  item: yup.string().transform(function (value) {
    return this.isType(value) && isValidObjectId(value) ? value : "";
  }),
  // Validate the playlist id
  id: yup.string().transform(function (value) {
    return this.isType(value) && isValidObjectId(value) ? value : "";
  }),
  visibility: yup
    .string()
    .oneOf(["public", "private"], "Visibility must be public or private!"),
});
