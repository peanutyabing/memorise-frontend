import { useNavigate } from "react-router-dom";
import useSignOut from "../../Hooks/useSignOut.js";
import useUser from "../../Hooks/useUser.js";
import { Fragment } from "react";
import { classNames } from "./Navbar.js";
import { Menu, Transition } from "@headlessui/react";
import { Chip } from "@material-tailwind/react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { RocketLaunchIcon } from "@heroicons/react/24/solid";

export default function ProfileDropdown() {
  const { user } = useUser();
  const navigate = useNavigate();
  const signOut = useSignOut();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="rounded-full p-1 hover:-translate-y-1 hover:scale-110 duration-300">
          <span className="sr-only">Open user menu</span>
          {user?.imageUrl ? (
            <img
              className="h-8 w-8 rounded-full"
              src={user?.imageUrl}
              alt={user?.username}
            />
          ) : (
            <UserCircleIcon className="h-6 w-6" />
          )}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        {user?.username ? (
          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-sky-500 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              <Chip
                className="mx-2 mt-1 cursor-pointer hover:shadow-lg"
                value={`${user.xp} points`}
                variant="gradient"
                color="amber"
                icon={<RocketLaunchIcon />}
                onClick={() => {
                  navigate("/");
                }} //// placeholder for xp history
              />
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div
                  className={classNames(
                    active ? "bg-pale-100" : "",
                    "block px-4 py-2 text-sm text-white dark:text-black cursor-pointer select-none"
                  )}
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Your Profile
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div
                  className={classNames(
                    active ? "bg-pale-100" : "",
                    "block px-4 py-2 text-sm text-white dark:text-black cursor-pointer select-none"
                  )}
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Settings
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div
                  onClick={handleSignOut}
                  className={classNames(
                    active ? "bg-pale-100" : "",
                    "block px-4 py-2 text-sm text-white dark:text-black cursor-pointer select-none"
                  )}
                >
                  Sign out
                </div>
              )}
            </Menu.Item>
          </Menu.Items>
        ) : (
          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-sky-500 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                <div
                  className={classNames(
                    active ? "bg-pale-100" : "",
                    "block px-4 py-2 text-sm text-white dark:text-black cursor-pointer select-none"
                  )}
                  onClick={() => {
                    navigate("/sign-in");
                  }}
                >
                  Sign in
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div
                  className={classNames(
                    active ? "bg-pale-100" : "",
                    "block px-4 py-2 text-sm text-white dark:text-black cursor-pointer select-none"
                  )}
                  onClick={() => {
                    navigate("/sign-up");
                  }}
                >
                  Create account
                </div>
              )}
            </Menu.Item>
          </Menu.Items>
        )}
      </Transition>
    </Menu>
  );
}
