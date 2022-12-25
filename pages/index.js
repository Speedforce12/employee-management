import Head from "next/head";
import { BiUserPlus } from "react-icons/bi";
import Form from "../components/Form";
import Table from "../components/Table";
import { useSelector, useDispatch } from "react-redux";
import { toggleAction } from "../redux/reducer";
import UpdateForm from "../components/UpdateForm";

export default function Home() {
  const visible = useSelector((state) => state.app.client.toggleForm);
  const showUpdate = useSelector((state) => state.app.client.toggleUpdate);

  const dispatch = useDispatch();

  return (
    <div>
      <Head>
        <title>Employee Management</title>
        <meta name='description' content='Manage Employee Records' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='px-8'>
        <h1 className='text-xl font-bold md:text-5xl text-center py-10'>
          Employee Management
        </h1>

        <div className='container mx-auto flex justify-between py-5 border-b'>
          <div className='flex gap-3 left'>
            <button
              disabled={showUpdate ? true : false}
              className='flex disabled:bg-gray-100 disabled:text-indigo-200 disabled:cursor-not-allowed text-white bg-indigo-500 px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-indigo-500 hover:text-gray-800'
              onClick={() => dispatch(toggleAction())}>
              Add Employee
              <span className='px-1'>
                <BiUserPlus size={23} />
              </span>
            </button>
          </div>
        </div>

        {/* collapsable form */}

        <div className='container mx-auto py-6'>
          {visible ? <Form /> : <div></div>}
        </div>

        <div className='container mx-auto py-6'>
          {showUpdate ? <UpdateForm /> : <div></div>}
        </div>

        {/* table */}
        <div className='container mx-auto overflow-x-auto'>
          <Table />
        </div>
      </main>
    </div>
  );
}
