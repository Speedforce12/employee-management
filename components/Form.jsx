import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import {BiPlus} from "react-icons/bi"
import { toast } from "react-toastify";

const validationSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  salary: yup
    .number()
    .positive()
    .min(200, "Please enter a salary more than $200")
    .required(),
});

const Form = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      date: "",
      email: "",
      salary: 200,
      status: "",
    },

    validateOnBlur: true,
    validationSchema: validationSchema,

    onSubmit: (values) => {
      console.log(values);
      formik.resetForm();
      formik.setSubmitting(false);
      toast.success("Employee has been submitted successfully")
    },
  });

  return (
    <form
      className='grid lg:grid-cols-2 grid-cols-1 w-4/6 gap-4'
      onSubmit={formik.handleSubmit}>
      <div className='input-type'>
        <label
          htmlFor='fullName'
          className={`block font-["Poppins"] text-sm ${
            formik.touched.name && formik.errors.name
              ? "text-red-400"
              : "text-black"
          } `}>
          {formik.touched.name && formik.errors.name
            ? formik.errors.name
            : "Name"}
        </label>
        <input
          type='text'
          name='name'
          id='fullName'
          className='border w-full px-5 py-3 focus:outline-none rounded-md'
          onChange={formik.handleChange}
          value={formik.values.name}
          onBlur={formik.handleBlur}
        />
      </div>

      <div className='input-type'>
        <label
          htmlFor='email'
          className={`block font-["Poppins"] text-sm ${
            formik.touched.email && formik.errors.email
              ? "text-red-400"
              : "text-black"
          } `}>
          {formik.touched.email && formik.errors.email
            ? formik.errors.email
            : "Email"}
        </label>
        <input
          type='email'
          name='email'
          className='border w-full px-5 py-3 focus:outline-none rounded-md'
          onChange={formik.handleChange}
          value={formik.values.email}
          onBlur={formik.handleBlur}
        />
      </div>
      <div className='input-type'>
        <label
          htmlFor='salary'
          className={`block font-["Poppins"] text-sm ${
            formik.touched.salary && formik.errors.salary
              ? "text-red-400"
              : "text-black"
          } `}>
          {formik.touched.salary && formik.errors.salary
            ? formik.errors.salary
            : "Salary"}
        </label>
        <input
          type='number'
          name='salary'
          className='border w-full px-5 py-3 focus:outline-none rounded-md'
          onChange={formik.handleChange}
          value={formik.values.salary}
          onBlur={formik.handleBlur}
        />
      </div>
      <div className='input-type'>
        <label
          htmlFor='date'
          className={`block font-["Poppins"] text-sm ${
            formik.touched.date && formik.errors.date
              ? "text-red-400"
              : "text-black"
          } `}>
          {formik.touched.date && formik.errors.date
            ? formik.errors.date
            : "D.O.B"}
        </label>
        <input
          type='date'
          name='date'
          id='birth'
          className='border w-full px-5 py-3 focus:outline-none rounded-md'
          onChange={formik.handleChange}
          value={formik.values.date}
        />
      </div>

      <div className='flex gap-10 items-center'>
        <div>
          <input
            id='radioDefault'
            type='radio'
            name='status'
            className='form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 checked:bg-green-300 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
            onChange={() => formik.setFieldValue("status", "active")}
            value='active'
            checked={formik.values.status === "active"}
          />
          <label htmlFor='radioDefault' className='inline-block text-gray-800'>
            Active
          </label>
        </div>

        <div className='input-check'>
          <input
            id='radioDefault2'
            type='radio'
            name='status'
            className='form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 checked:bg-green-300 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
            value='inactive'
            checked={formik.values.status === "inactive"}
            onChange={() => formik.setFieldValue("status", "inactive")}
          />
          <label htmlFor='radioDefault2' className='inline-block text-gray-800'>
            Inactive
          </label>
        </div>
      </div>

      <button
        disabled={formik.isSubmitting}
        className='flex disabled:bg-gray-100 justify-center text-md w-3/6 bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-gray-500 hover:text-green-500'>
        Add
        <span>
          <BiPlus size={24} />
        </span>
      </button>
    </form>
  );
};

export default Form;
