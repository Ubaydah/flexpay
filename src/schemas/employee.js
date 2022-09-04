import * as Yup from "yup";

export const initialEmployeeValues = {
  name: "",
  email: "",
  role: "",
  department: "",
  salary: "",
};

export const EmployeeSchema = Yup.object().shape({
  name: Yup.string().required("Employee name is a required field"),
  role: Yup.string().required("Role is a required field"),
  department: Yup.string().required("Department is a required field"),
  salary: Yup.number().typeError("Only digit(s) is allowed").required("Salary is required"),
  email: Yup.string().email("Invalid email format").trim().required("Email is a required field"),
});
