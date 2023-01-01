import Image from "next/image";
import { BsThreeDots } from "react-icons/bs";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import { Popover } from "@headlessui/react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import {
  getUserData,
  openConfirmModal,
  toggleMainModal,
} from "../redux/reducer";
import UpdateTeacher from "./UpdateTeacher";

export default function EmployeeCard({ emp }) {
  const dispatch = useDispatch();

  const handleDelete = ({ emp }) => {
    const employeeId = emp._id;
    dispatch(openConfirmModal());
    dispatch(getUserData(employeeId));
  };

  const handleUpdate = ({ emp }) => {
    const employeeId = emp._id;
    dispatch(getUserData(employeeId));
    dispatch(
      toggleMainModal({
        show: true,
        content: <UpdateTeacher />,
        title: "Update Teacher",
      })
    );
  };

  return (
    <div className='max-w-[350px] bg-white p-3 rounded-lg shadow-lg'>
      <div className='flex items-center justify-between'>
        <span
          className={`${
            emp.status === "Active"
              ? "bg-green-200/80 text-green-700"
              : "bg-rose-200/80 text-rose-700"
          }  px-4 py-1 rounded-lg`}>
          {emp?.status}
        </span>

        <Popover className='flex justify-end relative'>
          <Popover.Button className='rounded-full cursor-pointer hover:bg-gray-100 p-1'>
            <BsThreeDots size={25} />
          </Popover.Button>
          <Popover.Panel className='absolute z-10 bg-gray-100 -right-5 top-8 rounded-lg w-32'>
            <div className='flex flex-col p-3'>
              <Link
                href='/employee/ovonee'
                className='text-indigo-500  px-3 cursor-pointer py-2 font-semibold hover:bg-gray-200 rounded-md'>
                More Info
              </Link>
              <Link
                onClick={() => handleDelete({ emp })}
                href='#'
                className='text-indigo-500 px-3 cursor-pointer py-2 font-semibold hover:bg-gray-200 rounded-md'>
                Delete
              </Link>
              <Link
                href='#'
                onClick={() => handleUpdate({ emp })}
                className='text-indigo-500  px-3 cursor-pointer py-2 font-semibold hover:bg-gray-200 rounded-md'>
                Edit
              </Link>
            </div>
          </Popover.Panel>
        </Popover>
      </div>

      <div className='relative flex flex-col justify-center items-center'>
        <Image
          src={`${emp?.avatar ? emp?.avatar : "/images/avatar.jpg"} `}
          width={100}
          height={300}
          alt='avatar'
          className='object-contain rounded-full'
        />
        <span className='text-lg font-semibold my-1'>{emp?.name}</span>
        <p className='text-gray-500/75'>Math Teacher</p>
      </div>

      <div className='bg-slate-100 rounded-md p-2 mt-3'>
        <div className='flex justify-between'>
          <div className='flex flex-col'>
            <p className='text-gray-500/75 text-sm'>Department</p>
            <span className='text-sm font-semibold my-1'>Mathematics</span>
          </div>

          <div className='flex flex-col'>
            <p className='text-gray-500/75 text-sm'>Date joined</p>
            <span className='text-sm font-semibold my-1'>{emp?.date}</span>
          </div>
        </div>
        <div className='flex flex-col mt-5 space-y-3'>
          <span className='flex items-center gap-2 text-sm font-[Poppins]'>
            <HiOutlineMail size={20} />
            {emp?.email}
          </span>

          <span className='flex items-center gap-2 text-sm font-[Poppins]'>
            <HiOutlinePhone size={20} />
            455-8714
          </span>
        </div>
      </div>
    </div>
  );
}
