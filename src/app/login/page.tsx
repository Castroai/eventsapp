import { LoginFormComponent } from "./components/LoginFormComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};
const LoginPage = () => {
  return (
    <div>
      <LoginFormComponent />
    </div>
  );
};

export default LoginPage;
