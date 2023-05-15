import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../../Hooks/useUser.js";
import { axiosDefault } from "../../Utils/axios.js";
import moment from "moment";
import { Chip } from "@material-tailwind/react";
import { RocketLaunchIcon } from "@heroicons/react/24/solid";
import {
  PencilIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";

export default function UsersOwnProfile() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [interests, setInterests] = useState([]);

  useEffect(() => {
    getUserInterests();
  }, [user?.id]);

  const getUserInterests = async () => {
    try {
      const interestsRes = await axiosDefault.get(`/interests/${user?.id}`);
      setInterests(interestsRes?.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="pt-20 pb-10 h-max min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <header></header>
      <div className="flex flex-col items-center justify-center w-full">
        <img
          src={user?.imageUrl}
          alt={user?.username}
          className="mt-2 w-24 h-24 rounded-full outline outline-2 outline-pale-500 dark:outline-pale-100"
        />
        <div className="flex items-center gap-2 mt-2">
          <div className="mt-2 text-lg font-semibold">@{user?.username}</div>
          <Chip
            className="mt-2 cursor-pointer hover:shadow-lg"
            value={`${user?.xp} XP`}
            variant="gradient"
            color="amber"
            icon={<RocketLaunchIcon />}
            onClick={() => {
              navigate("/my-xp");
            }}
          />
        </div>
        <div className="mt-2">
          Member since {moment(user?.createdAt).format("DD MMM YYYY")}
        </div>

        {/* User Bio */}
        <div className="relative my-4 rounded-xl outline outline-2 outline-orange-500 w-11/12 xs:w-96">
          <div className="absolute rounded-t-lg inset-x-0 top-0 px-4 py-2 flex items-center justify-between bg-orange-500">
            <div className="font-semibold">My Profile</div>
            <div
              className="flex items-center hover:text-sky-500 hover:underline select-none cursor-pointer"
              onClick={() => {
                navigate("/edit-profile");
              }}
            >
              <PencilIcon className="w-4 h-4" />
              Edit
            </div>
          </div>
          <div className="pt-12 pb-4 px-4 grid grid-cols-[1fr_2fr] gap-x-4 gap-y-2 items-center w-fit">
            <div>First name:</div>
            <div>
              {user?.firstName || (
                <QuestionMarkCircleIcon className="w-5 h-5" />
              )}
            </div>
            <div>Last name:</div>
            <div>
              {user?.lastName || <QuestionMarkCircleIcon className="w-5 h-5" />}
            </div>
            <div>Username:</div>
            <div>{user?.username}</div>
            <div>Email:</div>
            <div>{user?.email}</div>
          </div>
        </div>

        {/* User interests */}
        <div className="relative my-4 rounded-xl outline outline-2 outline-orange-500 w-11/12 xs:w-96">
          <div className="absolute rounded-t-lg inset-x-0 top-0 px-4 py-2 flex items-center justify-between bg-orange-500">
            <div className="font-semibold">My Interests</div>
            <div
              className="flex items-center hover:text-sky-500 hover:underline select-none cursor-pointer"
              onClick={() => {
                navigate(`/edit-interests`);
              }}
            >
              <PencilIcon className="w-4 h-4" />
              Edit
            </div>
          </div>
          <div className="pt-12 pb-4 px-4 flex flex-col gap-x-4 gap-y-2">
            {interests.map((interest) => (
              <div key={interest.id} className="grid grid-cols-2 gap-2">
                <div>{interest.language?.name}</div>
                <div>{interest.fluencyLevel?.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
