import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { Button } from "./ui/button";
import Image from "next/image";
import type { ShareDocumentDialogProps, UserType } from "types";
import { Label } from "./ui/label";
import UserTypeSelector from "./UserTypeSelector";
import { useEffect, useRef, useState } from "react";
import Collaborator from "./Collaborator";
import { useSelf } from "@liveblocks/react/suspense";
import { updateDocAccess } from "@/app/actions/room.action";
import { revalidatePath } from "next/cache";

function ShareModal({
  roomId,
  creatorId,
  collaborators,
  currentUserType,
}: ShareDocumentDialogProps) {
  const user = useSelf();
  const ref = useRef<HTMLInputElement>(null);
  const [userType, setUserType] = useState<UserType>("viewer");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  // share document with registered users
  const shareDocHandler = async () => {
    setLoading(true);
    const result = await updateDocAccess(roomId, email, userType);
    if ("errorMsg" in result) {
      setError(result.errorMsg);
    }
    ref.current!.value = "";
    setLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger>
        {currentUserType === "editor" ? (
          <Button className="gradient-blue flex flex-row items-center justify-center gap-2">
            <Image
              src="../assets/icons/share.svg"
              alt="share"
              width={20}
              height={20}
            />
            Share
          </Button>
        ) : null}
      </DialogTrigger>
      <DialogContent className="shad-dialog">
        <DialogHeader>
          <DialogTitle>Manage who can see this document</DialogTitle>
          <DialogDescription>
            select which users can see and edit this document
          </DialogDescription>
        </DialogHeader>
        <Label htmlFor="email" className="text-blue-100">
          Email address
        </Label>
        <div className="flex gap-3">
          <div className="flex flex-1 bg-dark-400">
            <Input
              ref={ref}
              placeholder="Enter email address"
              id="email"
              className="share-input"
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
            />

            <UserTypeSelector userType={userType} setUserType={setUserType} />
          </div>
          <Button
            className="gradient-blue flex h-full gap-1 px-5"
            disabled={loading}
            onClick={shareDocHandler}
          >
            {loading ? "Sharing..." : "Share"}
          </Button>
        </div>
        {error && <small className="text-red-500">{error}</small>}

        <div className="my-2 space-y-2">
          <ul>
            {collaborators.map((collaborator) => (
              <Collaborator
                key={collaborator.id}
                roomId={roomId}
                creatorId={creatorId}
                collaborator={collaborator}
                email={collaborator.email}
                user={user.info}
              />
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ShareModal;
