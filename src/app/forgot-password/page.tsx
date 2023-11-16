import ForgotPasswordComponent from "./components/ForgotPasswordComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password",
};
const ForgotPasswordPage = () => {
  return (
    <div>
      <ForgotPasswordComponent />
    </div>
  );
};

export default ForgotPasswordPage;
