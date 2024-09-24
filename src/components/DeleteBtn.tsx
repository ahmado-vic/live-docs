import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import Image from "next/image";
import { deleteRoom } from "@/app/actions/room.action";

async function DeleteBtn({ roomId }: { roomId: string }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="btn btn-error">
          <Image
            src="../assets/icons/delete.svg"
            alt="Delete"
            width={20}
            height={20}
          />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="shad-dialog">
        <AlertDialogHeader>
          <div className="mb-2 flex flex-row-reverse items-center justify-between">
            <AlertDialogCancel className="h-0 w-fit border-0 bg-transparent p-0 hover:bg-transparent hover:text-transparent">
              <Image
                src="../assets/icons/close.svg"
                alt="Close"
                width={25}
                height={25}
              />
            </AlertDialogCancel>
            <div className="w-fit rounded-full border-8 border-[#603333] bg-[#2C1616] p-2">
              <Image
                src="../assets/icons/delete.svg"
                alt="Delete"
                width={20}
                height={20}
              />
            </div>
          </div>
          <AlertDialogTitle>Delete document</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this document? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-[#2E3D5B] bg-[#27344D] hover:bg-[#27344D] hover:text-white">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="button bg-[#ee4242] hover:bg-[#ee4242]"
            onClick={() => void deleteRoom({ roomId })}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteBtn;
