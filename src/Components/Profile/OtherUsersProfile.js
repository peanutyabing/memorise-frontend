import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useUser from "../../Hooks/useUser.js";
import { axiosDefault } from "../../Utils/axios.js";
import { Chip } from "@material-tailwind/react";
import { RocketLaunchIcon } from "@heroicons/react/24/solid";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import moment from "moment";

export default function OtherUsersProfile() {
  const { user } = useUser();
  const { userId } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [interests, setInterests] = useState([]);

  useEffect(() => {
    if (parseInt(user?.id) === parseInt(userId)) {
      navigate("/my-profile", { replace: true });
    }
  }, [user]);

  useEffect(() => {
    getUserProfile();
    getUserInterests();
  }, []);

  const getUserProfile = async () => {
    try {
      const userRes = await axiosDefault.get(`/profile/${userId}`);
      setProfile(userRes?.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getUserInterests = async () => {
    try {
      const interestsRes = await axiosDefault.get(`/interests/${userId}`);
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
          src={profile?.imageUrl}
          alt={profile?.username}
          className="mt-2 w-24 h-24 rounded-full outline outline-2 outline-pale-500 dark:outline-pale-100"
        />
        <div className="flex items-center gap-2 mt-2">
          <div className="mt-2 text-lg font-semibold">@{profile?.username}</div>
          <Chip
            className="mt-2 hover:shadow-lg"
            value={`${profile?.xp} XP`}
            variant="gradient"
            color="amber"
            icon={<RocketLaunchIcon />}
          />
        </div>
        <div className="mt-2">
          Member since {moment(profile?.createdAt).format("DD MMM YYYY")}
        </div>
        <div className="mt-2">
          Last seen {moment(profile?.lastLoggedIn).fromNow()}
        </div>

        {/* User Bio */}
        <div className="relative my-4 rounded-xl outline outline-2 outline-orange-500 w-11/12 xs:w-96">
          <div className="absolute rounded-t-lg inset-x-0 top-0 px-4 py-2 bg-orange-500">
            <div className="font-semibold">Profile</div>
          </div>
          <div className="pt-12 pb-4 px-4 grid grid-cols-[1fr_2fr] gap-x-4 gap-y-2 items-center w-fit">
            <div>First name:</div>
            <div>
              {profile?.firstName || (
                <QuestionMarkCircleIcon className="w-5 h-5" />
              )}
            </div>
            <div>Last name:</div>
            <div>
              {profile?.lastName || (
                <QuestionMarkCircleIcon className="w-5 h-5" />
              )}
            </div>
            <div>Username:</div>
            <div>{profile?.username}</div>
            <div>Email:</div>
            <div>{profile?.email}</div>
          </div>
        </div>

        {/* User interests */}
        <div className="relative my-4 rounded-xl outline outline-2 outline-orange-500 w-11/12 xs:w-96">
          <div className="absolute rounded-t-lg inset-x-0 top-0 px-4 py-2 bg-orange-500">
            <div className="font-semibold">Interests</div>
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
