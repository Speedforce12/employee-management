import Head from "next/head";
import { BiUserPlus } from "react-icons/bi";
import EmployeeCard from "../../components/EmployeeCard";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { getEmployees } from "../../lib/helper";
import Spinner from "../../components/Spinner";

const employee = () => {
  // redux state
  const dispatch = useDispatch();
  // cache data
  const { isLoading, isError, data, error } = useQuery("employees", getEmployees, {
    select: (data) => data.sort((a, b) => b.id - a.id),
  });

  if (isLoading)
    return (
      <div className='flex justify-center items-center'>
        <Spinner />
      </div>
    );
  if (isError)
    return <div className='font-bold text-red-500'>Error {error}</div>;

  return (
    <>
      <Head>
        <title>Employee Management</title>
        <meta name='description' content='Manage Employee Records' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='mt-8 mx-auto container px-10'>
        {/* top bar */}
        <section className='flex justify-between'>
          <h2 className='md:text-2xl text-xl font-semibold rounded-lg bg-gray-200 py-2 px-4 text-indigo-500'>
            {data.length} Employees
          </h2>

          <div className='flex gap-3'>
            <button
              // disabled={showUpdate ? true : false}
              className='flex disabled:bg-gray-100 disabled:text-indigo-200 disabled:cursor-not-allowed text-white bg-indigo-500 px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-indigo-500 hover:text-gray-800'>
              Add Employee
              <span className='px-1'>
                <BiUserPlus size={23} />
              </span>
            </button>
          </div>
        </section>

        {/* main area for employee card */}

        <section className='grid  md:grid-cols-2 lg:grid-cols-4 grid-cols-1 mt-6 gap-5'>
          {data?.map((emp, i) => (
            <EmployeeCard  emp={emp}  key={i}/>
          ))}
        </section>
      </div>
    </>
  );
};

export default employee;
