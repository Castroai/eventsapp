import { ReactNode } from "react";

interface FormWrapperProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
}
export const FormWrapper = ({ children }: FormWrapperProps) => {
  return (
    <form className="hero bg-base-200 p-8 rounded-lg shadow-md w-full sm:w-96 flex flex-col gap-2">
      {children}
    </form>
  );
};
