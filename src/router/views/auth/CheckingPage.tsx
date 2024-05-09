import { ImSpinner8 } from "react-icons/im";

export const CheckingPage = () => {
  return (
    <div className="flex justify-center w-full h-screen align-middle bg-background text-foreground">
      <ImSpinner8 className="w-16 h-16 my-auto animate-spin" />
    </div>
  );
};
