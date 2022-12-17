import Image from "next/image";
import React from "react";
import { BiEdit, BiTrash, BiTrashAlt } from "react-icons/bi";
import data from "../database/data.json"

const Table = ({ id, name, salary, date, email, avatar, status }) => {
  
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
        {data.map((obj, i) => (
          <tr className='bg-gray-50 text-center' key={i}>
            <td className='px-16 py-2 flex flex-row items-center relative'>
              <img
                src={obj.avatar ? obj.avatar : "#"}
                className='object-contain'
              />
              <span className='text-center ml-2 font-semibold '>{name}</span>
            </td>
            <td className='px-16 py-2'>
              <span>{obj.email}</span>
            </td>
            <td className='px-16 py-2'>
              <span>${obj.salary}</span>
            </td>
            <td className='px-16 py-2'>
              <span>{obj.date}</span>
            </td>
            <td className='px-16 py-2'>
              <button className='cursor-point'>
                <span className={`rounded-full px-4 py-1 ${obj.status === 'Active' ? "bg-green-600  text-green-300" : "bg-red-500 text-red-300"} `}>
                  {obj.status ? obj.status : " "}
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
        ))}
      </tbody>
    </table>
  );
};

export default Table;
