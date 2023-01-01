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
  // redux state handler for employeeId
  const employeeId = useSelector((state) => state.app.client.employeeId);
  const queryClient = useQueryClient();

  const dispatch = useDispatch();

  const cancelhandler = async () => {
    console.log("cancelled");
    await dispatch(getUserData(null));
  };

  const deletehandler = async () => {
    if (employeeId) {
      await deleteUser(employeeId);
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
            <h1 className='text-xl dark:text-white font-bold md:text-5xl text-center py-10'>
              Employee Management
            </h1>


     
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

// function DeleteConfirmation({ deletehandler, cancelhandler }) {
//   return (
//     <div className='flex gap-5 items-center'>
//       <p className='font-semibold'>Are you sure?</p>
//       <button
//         className='items-center flex bg-green-500 text-white px-4 py-2 rounded-md hover:border-green-500 hover:text-gray-50'
//         onClick={deletehandler}>
//         Confirm
//         <span className='px-1'>
//           <GiConfirmed size={22} />
//         </span>
//       </button>
//       <button
//         className='items-center flex bg-red-500 text-white px-4 py-2 rounded-md hover:border-rose-500 hover:text-gray-50'
//         onClick={cancelhandler}>
//         Cancel
//         <span className='px-1'>
//           <GiCancel size={22} />
//         </span>
//       </button>
//     </div>
//   );
// }
