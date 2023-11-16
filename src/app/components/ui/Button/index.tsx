export const Button = ({
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <button {...rest} className="btn btn-primary w-full " />;
};
