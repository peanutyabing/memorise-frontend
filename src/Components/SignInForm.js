import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth.js";
import { axiosDefault } from "../Utils/axios";
import { Card, Input, Checkbox, Button } from "@material-tailwind/react";

export default function SignInForm() {
  const { setAuth, trustDevice, setTrustDevice } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleTrustDevice = () => {
    setTrustDevice((prevState) => !prevState);
  };

  useEffect(() => {
    localStorage.setItem("trustDevice", trustDevice);
  }, [trustDevice]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please provide your email and password!");
      return;
    }
    try {
      const signInRes = await axiosDefault.post(
        "/auth/sign-in",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      const { token } = signInRes.data;
      setAuth({ token });
      setEmail("");
      setPassword("");
      navigate(from, { replace: true });
    } catch (err) {}
  };

  return (
    <div className="h-screen pt-20 flex flex-col justify-center align-center bg-white text-black dark:bg-black dark:text-white">
      <Card className="mx-auto" color="transparent" shadow={false}>
        <h1 className="text-center text-xl font-medium dark:text-white">
          Welcome back!
        </h1>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleSignIn}
        >
          <div className="mb-4 flex flex-col gap-6">
            <Input
              size="lg"
              color="orange"
              className="dark:text-white"
              label="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Input
              type="password"
              size="lg"
              color="orange"
              className="dark:text-white"
              label="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <Checkbox
            label={
              <div className="flex items-center text-black dark:text-white">
                Trust this device
              </div>
            }
            containerProps={{ className: "-ml-2.5" }}
            color="orange"
            checked={trustDevice}
            onChange={toggleTrustDevice}
          />
          <Button
            className="mt-4 font-quicksand text-sm"
            fullWidth
            type="submit"
            color="orange"
          >
            Sign In
          </Button>
          <div className="mt-4 text-center text-black dark:text-white">
            Need an account?{" "}
            <span
              onClick={() => {
                navigate("/sign-up");
              }}
              className="font-medium text-blue-500 transition-colors hover:text-blue-700 cursor-pointer select-none"
            >
              Sign Up
            </span>
          </div>
        </form>
      </Card>
    </div>
  );
}
