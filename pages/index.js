import Head from "next/head";
import { BiUserPlus } from "react-icons/bi";
import Form from "../components/Form";
import Table from "../components/Table";
import { useSelector, useDispatch } from "react-redux";
import { getUserData, toggleAction } from "../redux/reducer";
import UpdateForm from "../components/UpdateForm";
import { GiConfirmed, GiCancel } from "react-icons/gi";
import { deleteEmployee, getEmployee } from "../lib/helper";
import { useQueryClient } from "react-query";
import { getSession, useSession } from "next-auth/react";

export default function Home() {
  
  const { data: session } = useSession();
  const visible = useSelector((state) => state.app.client.toggleForm);
  const showUpdate = useSelector((state) => state.app.client.toggleUpdate);
  // redux state handler for userId
  const userId = useSelector((state) => state.app.client.userId);
  const queryClient = useQueryClient();

  const dispatch = useDispatch();

  const cancelhandler = async () => {
    console.log("cancelled");
    await dispatch(getUserData(null));
  };

  const deletehandler = async () => {
    if (userId) {
      await deleteUser(userId);
      await queryClient.invalidateQueries("employees");
      await dispatch(getUserData(null));
    }
  };

  return (
    <>
      {session && (
        <div>
          <Head>
            <title>Employee Management</title>
            <meta name='description' content='Manage Employee Records' />
            <link rel='icon' href='/favicon.ico' />
          </Head>

          <main className='px-8 min-h-screen'>
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
              {userId ? (
                DeleteConfirmation({ deletehandler, cancelhandler })
              ) : (
                <></>
              )}
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
      )}
    </>
  );
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

function DeleteConfirmation({ deletehandler, cancelhandler }) {
  return (
    <div className='flex gap-5 items-center'>
      <p className='font-semibold'>Are you sure?</p>
      <button
        className='items-center flex bg-green-500 text-white px-4 py-2 rounded-md hover:border-green-500 hover:text-gray-50'
        onClick={deletehandler}>
        Confirm
        <span className='px-1'>
          <GiConfirmed size={22} />
        </span>
      </button>
      <button
        className='items-center flex bg-red-500 text-white px-4 py-2 rounded-md hover:border-rose-500 hover:text-gray-50'
        onClick={cancelhandler}>
        Cancel
        <span className='px-1'>
          <GiCancel size={22} />
        </span>
      </button>
    </div>
  );
}
