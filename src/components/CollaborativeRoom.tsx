"use client";

import { Editor } from "@/components/editor/Editor";
import Header from "@/components/Header";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

import { updateRoomTitle } from "@/app/actions/room.action";
import {
  ClientSideSuspense,
  RoomProvider,
  useOthers,
} from "@liveblocks/react/suspense";
import Image from "next/image";
import { useState } from "react";
import type { CollaborativeRoomProps } from "types";
import ActiveCollaborators from "./ActiveCollaborators";
import Loader from "./Loader";
import ShareModal from "./ShareModal";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function CollaborativeRoom({
  roomId,
  roomMetadata,
  users,
  currentUserType,
}: CollaborativeRoomProps) {
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(roomMetadata?.title || "Untitled");

  return (
    <RoomProvider id={roomId}>
      <ClientSideSuspense fallback={<Loader />}>
        <div className="collaborative-room">
          <Header>
            <div className="flex items-center justify-between gap-2">
              {edit ? (
                <Input
                  autoFocus
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onBlur={() => {
                    setEdit(false);
                    void updateRoomTitle({ roomId, title });
                  }}
                  className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              ) : (
                <p className="document-title">{title}</p>
              )}
              {currentUserType === "editor" ? (
                <Button
                  onClick={() => setEdit(!edit)}
                  variant={"ghost"}
                  className="flex items-center justify-center p-0 hover:bg-transparent"
                >
                  <Image
                    src="../assets/icons/edit.svg"
                    alt="edit"
                    width={20}
                    height={20}
                  />
                </Button>
              ) : (
                <p className="view-only-tag">View only</p>
              )}
            </div>
            <div className="flex w-full flex-1 items-center justify-end gap-2 sm:gap-3">
              <ActiveCollaborators />

              {/* share modal */}
              <ShareModal
                roomId={roomId}
                creatorId={roomMetadata?.creatorId}
                collaborators={users}
                currentUserType={currentUserType}
              />

              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </Header>
          <Editor roomId={roomId} currentUserType={currentUserType} />
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  );
}
