import Link from "next/link";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeHolderText?: string;
  bottomRightLabel?: boolean;
}
export const TextInput = ({
  id,
  placeHolderText,
  bottomRightLabel,
  ...rest
}: TextInputProps) => {
  return (
    <div className="form-control w-full max-w-xs">
      <label className="label" htmlFor={id}>
        {placeHolderText}
      </label>
      <input
        {...rest}
        className="input input-bordered w-full max-w-xs"
        id={id}
      />
      {bottomRightLabel && (
        <label className="label">
          <span className="label-text-alt"></span>
          <span className="label-text-alt">
            <Link className="link " href={"/forgot-password"}>
              Forgot Password
            </Link>
          </span>
        </label>
      )}
    </div>
  );
};
