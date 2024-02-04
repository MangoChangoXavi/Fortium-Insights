import React from "react";
import Link from "next/link";
import {
  AddressIcon,
  EmailIcon,
  PhoneIcon,
} from "~/components/system/ui/Icons";
const TopHeader = () => {
  const items = [
    {
      icon: <PhoneIcon className="h-4 w-4" />,
      description: "+212 000 xx xx xx",
    },
    {
      icon: <EmailIcon className="h-4 w-4" />,
      description: "example@gmail.com",
    },
    {
      icon: <AddressIcon className="h-4 w-4" />,
      description: "your address here",
    },
  ];

  return (
    <div className="mx-3 py-3 text-center">
      <div className="flex justify-between gap-3 px-5 md:px-20 lg:mx-auto  lg:max-w-7xl">
        <div className="text-1xl hidden items-center font-bold text-secondary-700 text-transparent lg:flex">
          <p className="text-secondary-700">Tienes preguntas?</p>
        </div>
        <ul className="mx-auto flex flex-wrap justify-center gap-2 text-center md:gap-8 lg:mx-0">
          <li className="me-5 flex items-center gap-2 lg:me-0">
            <input
              className="dark:border-tertiary-50 border-tertiary-300 dark:bg-tertiary-500 dark:text-tertiary-200 h-10 rounded-lg  border px-5 pr-16 text-sm placeholder-current focus:outline-none "
              type="search"
              name="search"
              placeholder="Buscar propiedades"
            />
          </li>
          {items.map(({ icon, description }, index) => (
            <li key={index} className="flex items-center gap-2">
              <Link href={description}>
                <span>{icon}</span>
              </Link>
              {/* <span>{description}</span> */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default TopHeader;
