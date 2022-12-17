import Image from "next/image";
import React from "react";
import { BiEdit, BiTrash, BiTrashAlt } from "react-icons/bi";

const Table = () => {
  return (
    <table className='min-w-full table-auto'>
      <thead>
        <tr className='bg-gray-800'>
          <th className='px-16 py-2'>
            <span className='text-gray-200'>Name</span>
          </th>
          <th className='px-16 py-2'>
            <span className='text-gray-200'>Email</span>
          </th>
          <th className='px-16 py-2'>
            <span className='text-gray-200'>Salary</span>
          </th>
          <th className='px-16 py-2'>
            <span className='text-gray-200'>D.O.B</span>
          </th>
          <th className='px-16 py-2'>
            <span className='text-gray-200'>Status</span>
          </th>
          <th className='px-16 py-2'>
            <span className='text-gray-200'>Action</span>
          </th>
        </tr>
      </thead>

      <tbody className='bg-gray-200'>
        <tr className='bg-gray-50 text-center'>
          <td className='px-16 py-2 flex flex-row items-center relative'>
            <img src='#' className='object-contain' />
            <span className='text-center ml-2 font-semibold '>
              O'vonee Delpesche
            </span>
          </td>
          <td className='px-16 py-2'>
            <span>ovoneedee@gmail.com</span>
          </td>
          <td className='px-16 py-2'>
            <span>$2568</span>
          </td>
          <td className='px-16 py-2'>
            <span>09/05/1996</span>
          </td>
          <td className='px-16 py-2'>
            <button className='cursor-point'>
              <span className='bg-green-600 rounded-full px-4 py-1 text-green-300'>
                Active
              </span>
            </button>
          </td>
          <td className='px-16 py-2 space-x-4'>
            <button>
              <BiEdit size={25} color={"rgb(34,197,94)"} />
            </button>
            <button>
              <BiTrash size={25} color={"rgb(244,63,94)"} />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
