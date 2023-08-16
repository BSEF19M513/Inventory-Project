import { Fragment, useContext } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import AuthContext from "../AuthContext";
import { Link } from "react-router-dom";

const navigation = [
  { name: "Dashboard", href: "/", current: true },
  { name: "Inventory", href: "/inventory", current: false },
  { name: "Purchase Details", href: "/purchase-details", current: false },
  { name: "Sales", href: "/sales", current: false },
  { name: "Manage Store", href: "/manage-store", current: false },
];

const userNavigation = [
  { name: "Log Out", href: "./login" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {

  const authContext = useContext(AuthContext);
  const localStorageData = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-full">
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="flex justify-center items-center gap-2">
                      <img
                        className="h-8 w-8"
                        src={require("../assets/logo.png")}
                        alt="Inventory Management System"
                      />
                      <span className="font-bold text-white italic">
                        Inventory Management
                      </span>
                    </div>
                  </div>
                </div>


                {/* add a logout button here */}
                <button
                  className="bg-red-400 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                >
                  <Link to="/login"
                  className="text-white text-center "
                  >Logout</Link>
                </button>

              </div>
            </div>



          </>
        )}
      </Disclosure>
    </div>
  );
}