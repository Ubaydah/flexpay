import * as Yup from "yup";

export const initialCompanyDetailsValues = {
  company_name: "",
  email: "",
  address: "",
  phone_number: "",
  password: "",
  confirm_password: "",
};

export const CompanyDetailsSchema = Yup.object().shape({
  company_name: Yup.string().required("Company name is a required field"),
  address: Yup.string().required("Company address is a required field"),
  email: Yup.string().email("Invalid email format").trim().required("Email is a required field"),
  phone_number: Yup.number().typeError("Only digit(s) is allowed").required("Phone number is a required field"),
  password: Yup.string().required("Password is required").min(8, "minimum of 8 characters"),
  confirm_password: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export const initialSigninValues = {
  email: "",
  password: "",
};

export const signinSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email format").trim().required("Email is a required field"),
  password: Yup.string().required("Password is required").min(8, "minimum of 8 characters"),
});
