import { AiFillCheckCircle } from "react-icons/ai";
import { BiErrorAlt } from "react-icons/bi";
interface ConfirmationProps {
  type: "SUCCESS" | "FAIL";
  message: string;
}

export const Confirmation = ({ message, type }: ConfirmationProps) => {
  if (type === "SUCCESS") {
    return (
      <div className="flex justify-center items-center h-full flex-col gap-4">
        <AiFillCheckCircle className="text-green-400 w-40 h-40" />
        <p>{message}</p>
      </div>
    );
  }
  return (
    <div className="flex justify-center items-center h-full flex-col gap-4">
      <BiErrorAlt className="text-red-400 w-40 h-40" />
      <p>{message}</p>
    </div>
  );
};
