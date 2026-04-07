"use client";
import { Modal } from "@mui/material";
import { useGlobalStore } from "../store/GlobalStore";

import { XMarkIcon } from "@heroicons/react/20/solid";
import Login from "../Components/Forms/Login";
import SIgnUp from "../Components/Forms/SIgnUp";
import CommentModal from "../Components/CommentModal";
export default function DisplayModal() {
  const modaltype = useGlobalStore((state) => state.modaltype);

  const handleClose = useGlobalStore((state) => state.closeModal);

  return (
    <>
      <Modal
        open={modaltype != null}
        onClose={handleClose}
        className="flex justify-center items-center rounded-full"
      >
        <div className="w-full h-full sm:w-150 sm:h-fit bg-neutral-100 sm:rounded-xl outline-none relative">
          <XMarkIcon
            className="w-7 mt-5 ms-5 cursor-pointer"
            onClick={handleClose}
          ></XMarkIcon>
          {modaltype === "login" && <Login />}
          {modaltype === "signup" && <SIgnUp />}
          {modaltype === "comment" && <CommentModal/>}
        </div>
      </Modal>
    </>
  );
}
