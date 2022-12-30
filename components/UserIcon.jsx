import { Popover } from "@headlessui/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";

const UserIcon = ({ user }) => {
  console.log(user)
  return (
    <>
      <Popover className='flex justify-end relative'>
        <Popover.Button className='rounded-full cursor-pointer hover:bg-gray-100'>
          <img
            src={user.image || '/images/avatar.jpg'}
            atl=''
            className='h-12 w-12 rounded-full shadow-lg border-gray-50 cursor-pointer'
          />
        </Popover.Button>
        <Popover.Panel className='absolute -right-6 top-8 z-10 my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600'>
          <div className='py-3 px-4'>
            <span className='block text-sm font-semibold text-gray-900 dark:text-white'>
              {user.name || user.username}
            </span>
            <span className='block text-sm font-light text-gray-500 truncate dark:text-gray-400'>
              {user.email}
            </span>
          </div>
          <ul
            className='py-1 font-light text-gray-500 dark:text-gray-400'
            aria-labelledby='dropdown'>
            <li>
              <Link
                href='/profile/id'
                className='block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white'>
                My profile
              </Link>
            </li>
            <li>
              <a
                href='#'
                className='block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white'>
                Account settings
              </a>
            </li>
          </ul>

          <ul
            className='py-1 font-light text-gray-500 dark:text-gray-400'
            aria-labelledby='dropdown'>
            <li>
              <Link
                href='/#'
                onClick={() => signOut()}
                className='block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                Sign out
              </Link>
            </li>
          </ul>
        </Popover.Panel>
      </Popover>
    </>
  );
};

export default UserIcon;
