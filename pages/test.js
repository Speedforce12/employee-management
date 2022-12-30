import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ImCancelCircle } from "react-icons/im";
import { useState } from "react";
import imageConverter from "../lib/imageConverter";
import PreviewImage from "../components/PreviewImage";

// validation for input fields
const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  salary: yup
    .number()
    .positive()
    .min(200, "Please enter a salary more than $200")
    .required(),
  avatar: yup
    .mixed()
    .test(1000, "File Size is too large", (value) => value.size <= FILE_SIZE)
    .test("fileType", "Unsupported File Format", (value) =>
      SUPPORTED_FORMATS.includes(["image/*"])
    ),
});

export default function test() {
  const [picture, setPicture] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "all",
  });
  const onSubmit = (data) => {
    console.log(data);
  };

  // handle image preview
  const handleAvatarChange = async (e) => {
    const base64 = await imageConverter(e.target.files[0]);
    setPicture(base64);
  };

  return (
    <div className='relative p-4 w-full max-w-2xl h-full md:h-auto'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid gap-4 mb-4 sm:grid-cols-2'>
          <div>
            <label
              htmlFor='name'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Name
            </label>
            <input
              type='text'
              id='name'
              {...register("name")}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
            />
          </div>
          <div>
            <label
              htmlFor='email'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Email
            </label>
            <input
              type='email'
              id='name'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
              {...register("email")}
            />
          </div>
          <div>
            <label
              htmlFor='contact'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Contact
            </label>
            <input
              type='text'
              id='contact'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
              {...register("contact")}
            />
          </div>
          <div>
            <label
              htmlFor='address'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Address
            </label>
            <input
              type='text'
              id='address'
              {...register("address")}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
            />
          </div>
          <div>
            <label
              htmlFor='joined'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Joined Date
            </label>
            <input
              type='date'
              id='joined'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
              {...register("joined")}
            />
          </div>
          <div>
            <label
              htmlFor='birth'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              D.O.B
            </label>
            <input
              type='date'
              id='birth'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
              {...register("birth")}
            />
          </div>
          <div>
            <label
              htmlFor='medicals'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Medicals
            </label>
            <input
              type='text'
              id='medicals'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
              {...register("medicals")}
            />
          </div>

          <div>
            <label
              htmlFor='departments'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Department
            </label>
            <select
              id='departments'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
              {...register("departments")}>
              <option value='Social Science'>Social Science</option>
              <option value='Mathematics'>Mathematics</option>
              <option value='Language'>Language</option>
              <option value='Science'>Science</option>
            </select>
          </div>
          <div className='sm:col-span-2'>
            <label
              htmlFor='avatar'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Update Avatar
            </label>

            <div className='inline-flex items-center w-full'>
              <PreviewImage image={picture} />
              <input
                type='file'
                id='avatar'
                accept='image/*'
                onChange={handleAvatarChange}
                className='file:bg-gray-500 file:p-5 file:border-0 file:text-white file:px-6 file:py-3 file:mr-3 file:cursor-pointer  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
              />
            </div>
          </div>
          <div className='sm:col-span-2'>
            <label
              htmlFor='qualification'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Qualifications/Achievements
            </label>
            <textarea
              id='qualifications'
              rows='5'
              className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
              {...register("qualifications")}
              placeholder='fill in employee qualifications...'></textarea>
          </div>
        </div>
        <div className='flex items-center space-x-4 justify-items-center'>
          <button
            onClick={() =>
              setValue("avatar", picture, { shouldValidate: true })
            }
            type='submit'
            className='gap-x-2 text-white items-center inline-flex bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'>
            Update Employee
          </button>
          <button
            type='button'
            className='gap-x-2 text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900'>
            <ImCancelCircle size={25} color='currentColor' />
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
