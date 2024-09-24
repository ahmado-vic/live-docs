"use client";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createDocument } from "@/app/actions/room.action";
import type { AddDocumentBtnProps } from "types";
import { useMediaQuery } from "usehooks-ts";

function AddDocumentButton({ userId, email }: AddDocumentBtnProps) {
  const matches = useMediaQuery("(min-width: 768px)");
  const addDocumentHandler = async () => {
    try {
      const room = await createDocument({ userId, email });
      if (room) {
        router.push(`/document/${room.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const router = useRouter();

  return (
    <Button
      onClick={addDocumentHandler}
      className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800"
    >
      <span>
        <Image
          src="../assets/icons/add.svg"
          alt="add document"
          width={24}
          height={24}
        />
      </span>
      {matches && "Add new document"}
    </Button>
  );
}

export default AddDocumentButton;
