import ForgotPasswordComponent from "./components/ForgotPasswordComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password",
};
const ForgotPasswordPage = () => {
  return (
    <div className="justify-center items-center flex h-full">
      <ForgotPasswordComponent />
    </div>
  );
};

export default ForgotPasswordPage;
