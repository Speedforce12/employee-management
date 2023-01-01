import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ImCancelCircle } from "react-icons/im";
import { useState } from "react";
import imageConverter from "../lib/imageConverter";
import PreviewImage from "./PreviewImage";
import { toggleMainModal } from "../redux/reducer";
import { useDispatch } from "react-redux";
import { useMutation, useQueryClient } from "react-query";
import { createEmployee } from "../lib/helper";
import { toast } from "react-toastify";

// validation for input fields
const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  medicals: yup.string().required(),
  contact: yup.string().required(),
  address: yup.string().required(),
  status: yup.string().required(),
  // avatar: yup.mixed().test("fileSize", "The file is too large", (value) => {
  //   return value && value[0].size > 2000000;
  // }),
});

export default function AddTeacher() {
  const [picture, setPicture] = useState(null);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const addMutation = useMutation(createEmployee, {
    onSuccess: () => {
      queryClient.invalidateQueries("employees");
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    addMutation.mutate(data);
    reset();
    dispatch(toggleMainModal({ show: false }));
    if (addMutation.isSuccess) {
      toast.success("Employee has been submitted successfully");
    }
  };

  // handle image preview
  const handleAvatarChange = async (e) => {
    const base64 = await imageConverter(e.target.files[0]);
    if (!base64) {
      setPicture("/images/avatar.jpg");
    }
    setPicture(base64);
  };

  return (
    <div className='relative p-4 w-full h-full md:h-auto'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid gap-4 mb-4 sm:grid-cols-2'>
          <div>
            <label
              htmlFor='name'
              className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${
                errors.name ? "text-red-400 dark:text-rose-600" : "text-black"
              } `}>
              {errors.name ? errors.name.message : "Name"}
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
              className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${
                errors.email ? "text-red-400 dark:text-rose-600" : "text-black"
              } `}>
              {errors.email ? errors.email.message : "Email"}
            </label>
            <input
              type='email'
              id='email'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
              {...register("email")}
            />
          </div>
          <div>
            <label
              htmlFor='contact'
              className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${
                errors.contact
                  ? "text-red-400 dark:text-rose-600"
                  : "text-black"
              } `}>
              {errors.contact ? errors.contact.message : "Contact"}
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
              className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${
                errors.address
                  ? "text-red-400 dark:text-rose-600"
                  : "text-black"
              } `}>
              {errors.address ? errors.address.message : "Address"}
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
              className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${
                errors.joined ? "text-red-400 dark:text-rose-600" : "text-black"
              } `}>
              {errors.joined ? errors.joined.message : "Joined Date"}
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
              className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${
                errors.birth ? "text-red-400 dark:text-rose-600" : "text-black"
              } `}>
              {errors.birth ? errors.birth.message : "D.O.B"}
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
              className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${
                errors.medicals
                  ? "text-red-400 dark:text-rose-600"
                  : "text-black"
              } `}>
              {errors.medicals ? errors.medicals.message : "Medicals"}
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
              htmlFor='department'
              className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${
                errors.department
                  ? "text-red-400 dark:text-rose-600"
                  : "text-black"
              } `}>
              {errors.department ? errors.department.message : "Department"}
            </label>
            <select
              id='department'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
              {...register("department")}>
              <option value='Social Science'>Social Science</option>
              <option value='Mathematics'>Mathematics</option>
              <option value='Language'>Language</option>
              <option value='Science'>Science</option>
            </select>
          </div>
          <div>
            <label
              htmlFor='teacher'
              className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${
                errors.teacher
                  ? "text-red-400 dark:text-rose-600"
                  : "text-black"
              } `}>
              {errors.teacher ? errors.teacher.message : "Teacher Type"}
            </label>
            <select
              id='teacher'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
              {...register("teacher")}>
              <option value='Graduate Teacher'>Graduate Teacher</option>
              <option value='Teacher I'>Teacher I</option>
              <option value='Teacher II'>Teacher II</option>
              <option value='Teacher III'>Teacher III</option>
            </select>
          </div>
          <div>
            <label
              htmlFor='status'
              className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${
                errors.status ? "text-red-400 dark:text-rose-600" : "text-black"
              } `}>
              {errors.status ? errors.status.message : "Status"}
            </label>
            <select
              id='status'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
              {...register("status")}>
              <option value='Active'>Active</option>
              <option value='Inactive'>Inactive</option>
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
                name='avatar'
                accept='image/*'
                onChange={handleAvatarChange}
                className='file:bg-gray-500 file:p-5 file:border-0 file:text-white file:px-6 file:py-3 file:mr-3 file:cursor-pointer  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
              />
            </div>
          </div>
          <div className='sm:col-span-2'>
            <label
              htmlFor='successes'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Qualifications/Achievements
            </label>
            <textarea
              id='successes'
              rows='5'
              // name="successes"
              className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
              {...register("successes")}
              placeholder='fill in employee successes...'></textarea>
          </div>
        </div>
        <div className='flex items-center space-x-4 justify-between'>
          <button
            onClick={() =>
              setValue("avatar", picture, { shouldValidate: true })
            }
            type='submit'
            className='gap-x-2 text-white items-center inline-flex bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'>
            Create Teacher
          </button>
          <button
            onClick={() => dispatch(toggleMainModal({ show: false }))}
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
