import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";

export default function Lost() {
  const navigate = useNavigate();

  return (
    <div className="pt-20 pb-10 h-max min-h-screen flex flex-col justify-start items-center bg-white text-black dark:bg-black dark:text-white">
      <h1 className="text-center text-xl font-medium dark:text-white">
        You seem lost - there's nothing here!
      </h1>
      <Button
        className="mt-4 font-quicksand text-sm"
        color="orange"
        onClick={() => {
          navigate(-1);
        }}
      >
        Go Back
      </Button>
    </div>
  );
}
