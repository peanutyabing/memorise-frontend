import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import useRefreshToken from "../Hooks/useRefreshToken.js";
import useAuth from "../Hooks/useAuth.js";
import { Spinner } from "@material-tailwind/react";

export default function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, trustDevice } = useAuth();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.log(err);
        alert(err.message);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !auth?.token ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
  }, []);

  return (
    <>
      {!trustDevice ? (
        <Outlet />
      ) : isLoading ? (
        <div className="h-screen dark:bg-black flex justify-center items-center">
          <Spinner className="h-12 w-12" />
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
}
