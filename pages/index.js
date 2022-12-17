import Head from "next/head";
import { useState } from "react";
import { BiUserPlus } from "react-icons/bi";
import Form from "../components/Form";
import Table from "../components/Table";


export default function Home() {
  const [visible, setVisible] = useState(false);

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
              className='flex text-white bg-indigo-500 px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-indigo-500 hover:text-gray-800'
              onClick={() => setVisible(!visible)}>
              Add Employee
              <span className='px-1'>
                <BiUserPlus size={23} />
              </span>
            </button>
          </div>
        </div>

        {/* collapsable form */}

      
        <div className='container mx-auto py-6'>
            { visible ?  <Form /> : <div></div>}
         
        </div>

        {/* table */}
        <div className='container mx-auto overflow-x-auto'>
          <Table />
        </div>
      </main>
    </div>
  );
}
