import { type InferType, object, ref, string } from "yup";

export const signupSchema = object({
  name: string().required("Full name is required"),
  email: string().email("Invalid email").required("Email is required"),
  dateOfBirth: string().required("Date of birth is required"),
  password: string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: string()
    .oneOf([ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export type SignupFormData = InferType<typeof signupSchema>;
