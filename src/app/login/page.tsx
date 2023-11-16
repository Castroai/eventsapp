import { LoginFormComponent } from "./components/LoginFormComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};
const LoginPage = () => {
  return (
    <div className="justify-center items-center flex h-full">
      <LoginFormComponent />
    </div>
  );
};

export default LoginPage;
