import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../../Hooks/useUser.js";
import { axiosDefault } from "../../Utils/axios.js";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate.js";
import { storage } from "../../Firebase.js";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { Card, Input, Button, Spinner } from "@material-tailwind/react";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export default function ProfileForm() {
  const { user } = useUser();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const [imageUrl, setImageUrl] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [imageInputValue, setImageInputValue] = useState("");
  const [uploading, setUploading] = useState(false);
  const [duplicatedUser, setDuplicatedUser] = useState({
    username: false,
    email: false,
  });

  useEffect(() => {
    setUsername(user?.username);
    setFirstName(user?.firstName || "");
    setLastName(user?.lastName || "");
    setEmail(user?.email);
    setImageUrl(user?.imageUrl);
  }, [user]);

  const checkIfUnique = async (attributeName, attributeValue) => {
    const response = await axiosDefault.post("/profile/check-if-exist", {
      [attributeName]: attributeValue,
    });
    setDuplicatedUser((prevState) => ({
      ...prevState,
      [attributeName]: response?.data?.userFound,
    }));
  };

  useEffect(() => {
    uploadFile().then((fileUrl) => {
      setImageUrl(fileUrl);
      setUploading(false);
    });
  }, [imageFile]);

  const uploadFile = () => {
    if (!imageFile) {
      return Promise.resolve("");
    }
    setUploading(true);
    const fileRef = ref(storage, `profile/${imageFile.name}`);
    return uploadBytes(fileRef, imageFile).then(() => getDownloadURL(fileRef));
  };

  const handleUpload = (e) => {
    setImageInputValue(e.target.value);
    setImageFile(e.target.files[0]);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (uploading) {
      alert("Your profile picture is uploading. Give it a sec!");
      return;
    }
    if (!username || !email) {
      alert("Please fill in your username, email and password!");
      return;
    }
    if (duplicatedUser.username || duplicatedUser.email) {
      alert("Please select a unique username and email");
      return;
    }

    await updateProfile();
    navigate("/my-profile");
  };

  const updateProfile = async () => {
    try {
      await axiosPrivate.put("/profile", {
        username,
        email,
        imageUrl,
        firstName,
        lastName,
      });
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  return (
    <div className="h-screen pt-20 flex flex-col justify-center align-center bg-white text-black dark:bg-black dark:text-white">
      <Card className="mx-auto" color="transparent" shadow={false}>
        <h1 className="text-center text-xl font-medium dark:text-white">
          My Profile
        </h1>
        <div className="m-auto mt-3 w-16 h-16">
          {uploading ? (
            <Spinner className="w-16 h-16" />
          ) : imageUrl ? (
            <img
              src={imageUrl}
              alt=""
              className="w-16 h-16 rounded-full outline outline-gray-400 outline-offset-2"
            />
          ) : (
            <UserCircleIcon className="w-16 h-16 rounded-full" />
          )}
        </div>
        <form
          className="mt-3 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleSignUp}
        >
          <div className="mb-2 flex flex-col gap-2">
            <input
              type="file"
              size="lg"
              color="orange"
              className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-blue-gray-200 bg-clip-padding px-3 py-[0.32rem] font-normal leading-[2.15] text-sm text-blue-gray-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-orange-500 focus:border-2 focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-blue-gray-700 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:text-white dark:focus:border-primary"
              label="Profile picture"
              value={imageInputValue}
              onChange={handleUpload}
            />
            <Input
              size="lg"
              color="orange"
              className="dark:text-white"
              label="First name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <Input
              size="lg"
              color="orange"
              className="dark:text-white"
              label="Last name"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
            <Input
              size="lg"
              color="orange"
              className="dark:text-white"
              label="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                checkIfUnique("username", e.target.value);
              }}
            />
            {duplicatedUser.username && (
              <div className="text-xs text-deep-orange-700 dark:text-deep-orange-200 -mt-2">
                This username already exists
              </div>
            )}
            <Input
              size="lg"
              color="orange"
              className="dark:text-white"
              label="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                checkIfUnique("email", e.target.value);
              }}
            />
            {duplicatedUser.email && (
              <div className="text-xs text-deep-orange-700 dark:text-deep-orange-200 -mt-2">
                This email already exists
              </div>
            )}
          </div>
          <Button
            className="mt-4 font-quicksand text-sm"
            fullWidth
            type="submit"
            color="orange"
          >
            Update Profile
          </Button>
        </form>
      </Card>
    </div>
  );
}
