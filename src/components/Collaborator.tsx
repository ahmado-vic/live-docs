import Image from "next/image";
import React, { useState } from "react";
import type { CollaboratorProps } from "types";
import UserTypeSelector from "./UserTypeSelector";
import { Button } from "./ui/button";
import { removeCollaborator, updateDocAccess } from "@/app/actions/room.action";

function Collaborator({
  roomId,
  user,
  collaborator,
  email,
  creatorId,
}: CollaboratorProps) {
  const [userType, setUserType] = useState(collaborator.userType ?? "viewer");

  const shareDocHandler = async () => {
    await updateDocAccess(roomId, email, userType);
  };

  return (
    <li className="flex items-center justify-between gap-2 py-3">
      <div className="flex gap-2">
        <Image
          src={collaborator.avatar}
          alt={collaborator.name}
          width={32}
          height={32}
          className="size-9 rounded-full"
        />

        <div>
          <p className="line-clamp-1 text-sm font-semibold leading-4 text-white">
            {collaborator.name}
          </p>
          <p className="text-sm font-light text-blue-100">
            {collaborator.email}
          </p>
        </div>
      </div>
      {collaborator.id === creatorId ? (
        <p className="text-sm font-light text-blue-100">Owner</p>
      ) : (
        <div className="flex items-center">
          <UserTypeSelector
            roomId={roomId}
            email={email}
            userType={userType}
            setUserType={setUserType}
            onClickHandler={shareDocHandler}
          />
          <Button
            onClick={async () => {
              // remove collaborator
              await removeCollaborator(roomId, collaborator.email);
            }}
            size="sm"
          >
            Remove
          </Button>
        </div>
      )}
    </li>
  );
}

export default Collaborator;
