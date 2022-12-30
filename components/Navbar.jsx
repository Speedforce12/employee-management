import React, { useState } from "react";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import UserIcon from "./UserIcon";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <header className='bg-white shadow-sm shadow-gray-200  items-center flex'>
      <nav className='flex items-center justify-between w-[92%] mx-auto py-2'>
        <div className=''>
          <h1 className='text-3xl font-semibold tracking-wide text-blue-600'>
            E.M.S
          </h1>
        </div>
        <div
          className={` ${
            open ? "top-[9%] text-2xl" : "top-[-100%]"
          } md:static duration-300 absolute sm:bg-white bg-slate-200 md:min-h-fit min-h-[60vh]  left-0 z-50 md:w-auto w-full flex items-center px-5`}>
          <ul className='flex md:flex-row flex-col  md:items-center md:gap-[4vw] gap-8'>
            <li className='group text-gray-600 transition-all duration-300 ease-in-out'>
              <Link className='nav-link hover:text-gray-500 ' href='/'>
                Dashboard
              </Link>
            </li>
            <li className='group text-gray-600 transition-all duration-300 ease-in-out'>
              <Link
                className='nav-link hover:text-gray-500 '
                href='/attendance'>
                Attendance
              </Link>
            </li>
            <li className='group text-gray-600 transition-all duration-300 ease-in-out'>
              <Link className='nav-link hover:text-gray-500 ' href='/employee'>
                Employees
              </Link>
            </li>
          </ul>
        </div>
        <div className='flex items-center gap-6'>
          {session ? (
            <UserIcon {...session} />
          ) : (
            <button
              className='bg-blue-600 px-4 py-2 rounded-full text-white hover:bg-blue-400'
              onClick={() => router.push("/login")}>
              Sign in
            </button>
          )}

          {open ? (
            <AiOutlineClose
              onClick={() => setOpen(!open)}
              className='cursor-pointer md:hidden'
              size={25}
            />
          ) : (
            <GiHamburgerMenu
              onClick={() => setOpen(!open)}
              className='cursor-pointer md:hidden'
              size={25}
            />
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
