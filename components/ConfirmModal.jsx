import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../lib/helper";
import { getUserData, openConfirmModal } from "../redux/reducer";

export default function ConfirmModal() {
  const isOpen = useSelector((state) => state.app.client.modal.isOpen);
  const dispatch = useDispatch();
  // redux state handler for userId
  const userId = useSelector((state) => state.app.client.userId);
  const queryClient = useQueryClient();

  const CloseModal = () => {
    dispatch(openConfirmModal());
  };

  const deletehandler = async () => {
    if (userId) {
      await deleteUser(userId);
      await queryClient.invalidateQueries("users");
      dispatch(openConfirmModal());
      dispatch(getUserData(null));
    }
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={CloseModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'>
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'>
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 p-6 text-center text-gray-900'>
                    <svg
                      aria-hidden='true'
                      class='mx-auto mb-4 text-rose-500 w-14 h-14'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        stroke-width='2'
                        d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'></path>
                    </svg>
                    <h3 class='mb-5 text-lg font-semibold text-gray-800 dark:text-gray-400'>
                      Are you sure you want to delete this employee?
                    </h3>
                  </Dialog.Title>

                  <div className='mt-4 justify-between flex'>
                    <button
                      type='button'
                      className='text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2'
                      onClick={deletehandler}>
                      Confirm
                    </button>

                    <button
                      type='button'
                      className='text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-600 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600'
                      onClick={CloseModal}>
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
