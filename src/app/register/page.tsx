import { Metadata } from "next";
import { RegisterFormComponent } from "./components/RegisterFormComponent";

export const metadata: Metadata = {
  title: "Register",
};

const RegisterPage = () => {
  return (
    <div className="justify-center items-center flex h-full">
      <RegisterFormComponent />
    </div>
  );
};

export default RegisterPage;
