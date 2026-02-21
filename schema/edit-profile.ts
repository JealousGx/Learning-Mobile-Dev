import { type InferType, object, string } from "yup";

export const editProfileSchema = object({
  name: string().required("Full name is required"),
  email: string().email("Invalid email").required("Email is required"),
  dateOfBirth: string().required("Date of birth is required"),
  number: string().required("Phone number is required"),
  gender: string()
    .oneOf(["male", "female"], "Invalid gender")
    .required("Gender is required"),
});

export type EditProfileFormData = InferType<typeof editProfileSchema>;
