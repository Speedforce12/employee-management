import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/router";
import axios from "axios";

const PASSWORD_REGEX =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/;

const schema = yup.object({
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .matches(
      PASSWORD_REGEX,
      "Must Contain 6 Characters, One UpperCase Letter, OneLowercase Letter, One Number and One Special Case Character"
    )
    .required("No password provided."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Confirm password is required"),
});

const register = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    await axios.post("http://localhost:3000/api/auth/signup", data).then((data) => {
      router.push("/login");
      console.log(data)
    });

  }

  return (
    <section className='h-screen'>
      <div className='container px-6 py-12 h-full'>
        <div className='flex justify-center items-center flex-wrap h-full gap-6 text-gray-800'>
          <div className='md:w-8/12 lg:w-6/12 mb-12 md:mb-0'>
            <img
              src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg'
              className='w-full'
              alt='Phone image'
            />
          </div>
          <div className='md:w-8/12 lg:w-5/12 lg:ml-20'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-6'>
                <label
                  htmlFor='username'
                  className={`block  font-["Poppins"] text-sm ${
                    errors.username ? "text-red-400" : "text-black"
                  } `}>
                  {errors.username ? errors.username.message : "Username"}
                </label>
                <input
                  type='text'
                  id='username'
                  className='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                  {...register("username")}
                />
              </div>
              <div className='mb-6'>
                <label
                  htmlFor='email'
                  className={` block font-["Poppins"] text-sm ${
                    errors.email ? "text-red-400" : "text-black"
                  } `}>
                  {errors.email ? errors.email.message : "Email"}
                </label>
                <input
                  type='text'
                  id='email'
                  className='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                  {...register("email")}
                />
              </div>

              <div className='mb-6'>
                <label
                  htmlFor='password'
                  className={`block  font-["Poppins"] text-sm ${
                    errors.password ? "text-red-400" : "text-black"
                  } `}>
                  {errors.password ? errors.password.message : "Password"}
                </label>
                <input
                  autoComplete='off'
                  type='password'
                  id='password'
                  className='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                  {...register("password")}
                />
              </div>
              <div className='mb-6'>
                <label
                  htmlFor='confirmPassword'
                  className={`block font-["Poppins"]  text-sm ${
                    errors.confirmPassword ? "text-red-400" : "text-black"
                  } `}>
                  {errors.confirmPassword
                    ? errors.confirmPassword.message
                    : "Confirm Password"}
                </label>
                <input
                  autoComplete='off'
                  id='confirmPassword'
                  type='password'
                  className='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                  {...register("confirmPassword")}
                />
              </div>
              <div className='flex justify-between items-center mb-6'>
                <button
                  type='submit'
                  className='inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
                  data-mdb-ripple='true'
                  data-mdb-ripple-color='light'>
                  Create Account
                </button>
                <Link
                  href='/login'
                  className='text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out'>
                  Already have an account?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default register;
