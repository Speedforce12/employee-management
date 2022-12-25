import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BiBrush } from "react-icons/bi";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getUser, updateUser } from "../lib/helper";
import Spinner from "./Spinner";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";


// validation for input fields
const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  salary: yup
    .number()
    .positive()
    .min(200, "Please enter a salary more than $200")
    .required(),
});

export default function userDetail() {
  
  // redux state handler for userId
  const userId = useSelector((state) => state.app.client.userId);

  // react query to fetch the user to be updated
  const { data } = useQuery(["users", userId], () => getUser(userId));

  // react query mutation to pass updated user data to backend api
  const queryClient = useQueryClient();
  const updateMutation = useMutation((updated)=>updateUser(userId, updated), {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });

  // get input data from form to pass to mutation function 
  const onSubmit = (data) => {
    updateMutation.mutate(data);
    if (updateMutation.isSuccess) {
      toast.success("Employee has been updated successfully");
    }
    console.log(data);
  };

  // render update form once user data has been fetch successfully from backend
  if (data) {
    return <UpdateForm user={data} onSubmit={onSubmit} />;
  }

  return <Spinner />;
}

// update user form
function UpdateForm({ user, onSubmit }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: user,
    resolver: yupResolver(schema),
  });

  return (
    <form
      className='grid lg:grid-cols-2 grid-cols-1 w-4/6 gap-4'
      onSubmit={handleSubmit(onSubmit)}>
      <div className='input-type'>
        <label
          htmlFor='name'
          className={`block font-["Poppins"] text-sm ${
            errors.name ? "text-red-400" : "text-black"
          } `}>
          {errors.name ? errors.name.message : "Name"}
        </label>
        <input
          type='text'
          name='name'
          className='border w-full px-5 py-3 focus:outline-none rounded-md'
          {...register("name")}
        />
      </div>

      <div className='input-type'>
        <label
          htmlFor='email'
          className={`block font-["Poppins"] text-sm ${
            errors.email ? "text-red-400" : "text-black"
          } `}>
          {errors.email ? errors.email.message : "Email"}
        </label>
        <input
          type='email'
          name='email'
          className='border w-full px-5 py-3 focus:outline-none rounded-md'
          {...register("email")}
        />
      </div>
      <div className='input-type'>
        <label
          htmlFor='salary'
          className={`block font-["Poppins"] text-sm ${
            errors.salary ? "text-red-400" : "text-black"
          } `}>
          {errors.salary ? errors.salary.message : "Salary"}
        </label>
        <input
          type='number'
          name='salary'
          className='border w-full px-5 py-3 focus:outline-none rounded-md'
          {...register("salary")}
        />
      </div>
      <div className='input-type'>
        <label
          htmlFor='date'
          className={`block font-["Poppins"] text-sm ${
            errors.date ? "text-red-400" : "text-black"
          } `}>
          {errors.date ? errors.date.message : "D.O.B"}
        </label>
        <input
          type='date'
          name='date'
          className='border w-full px-5 py-3 focus:outline-none rounded-md'
          {...register("date")}
        />
      </div>
      <div className='flex gap-10 items-center'>
        <div>
          <input
            id='radioDefault'
            type='radio'
            className='form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 checked:bg-green-300 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
            {...register("status")}
            value='Active'
          />
          <label htmlFor='radioDefault' className='inline-block text-gray-800'>
            Active
          </label>
        </div>

        <div className='input-check'>
          <input
            id='radioDefault2'
            type='radio'
            className='form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 checked:bg-green-300 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
            value='Inactive'
            {...register("status")}
          />
          <label htmlFor='radioDefault2' className='inline-block text-gray-800'>
            Inactive
          </label>
        </div>
      </div>

      <button
        type='submit'
        className='flex disabled:bg-gray-100 justify-center text-md w-3/6 bg-yellow-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-gray-500 hover:text-yellow-500'>
        Update
        <span>
          <BiBrush size={24} />
        </span>
      </button>
    </form>
  );
}
