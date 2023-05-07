import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import DarkModeToggle from "./DarkModeToggle.js";
import ProfileDropdown from "./ProfileDropdown.js";

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navigation = [
    {
      name: "Home",
      url: "/",
      current: location.pathname === "/",
    },
    { name: "Feed", url: "/", current: false },
    {
      name: "My Decks",
      url: "/my-decks",
      current: location.pathname === "/my-decks",
    },
    { name: "Social", url: "/", current: false },
  ];

  return (
    <>
      <Disclosure
        as="nav"
        className="fixed top-0 w-full bg-black font-medium text-white dark:bg-white dark:text-black"
      >
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <img
                      className="block h-8 w-auto lg:hidden"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                      alt="Your Company"
                    />
                    <img
                      className="hidden h-8 w-auto lg:block"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                      alt="Your Company"
                    />
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <div
                          key={item.name}
                          onClick={() => {
                            navigate(item.url);
                          }}
                          className={classNames(
                            item.current
                              ? "underline decoration-yellow decoration-4 underline-offset-8"
                              : "",
                            "text-white dark:text-black rounded-md px-3 py-2 hover:-translate-y-1 hover:scale-110 duration-300"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <DarkModeToggle />
                  <ProfileDropdown />
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    onClick={() => {
                      navigate(item.url);
                    }}
                    className={classNames(
                      item.current
                        ? "underline decoration-yellow decoration-4 underline-offset-4"
                        : "",
                      "block rounded-md px-3 py-2 text-white dark:text-black rounded-md px-3 py-2"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Outlet />
    </>
  );
}
