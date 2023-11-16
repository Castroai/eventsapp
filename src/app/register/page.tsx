import { Metadata } from "next";
import { RegisterFormComponent } from "./components/RegisterFormComponent";

export const metadata: Metadata = {
  title: "Register",
};

const RegisterPage = () => {
  return (
    <div>
      <RegisterFormComponent />
    </div>
  );
};

export default RegisterPage;
