"use client";

import Loader from "@/components/Loader";
import {
  ClientSideSuspense,
  LiveblocksProvider,
} from "@liveblocks/react/suspense";
import type { ReactNode } from "react";
import { getDocumentUsers, getUsers } from "./actions/user.action";
import { useUser } from "@clerk/nextjs";

export function Provider({ children }: { children: ReactNode }) {
  const { user } = useUser();
  return (
    <LiveblocksProvider
      authEndpoint={"/api/liveblocks-auth"}
      resolveUsers={async ({ userIds }) => {
        const users = await getUsers({ userIds });

        return users;
      }}
      resolveMentionSuggestions={async ({
        roomId,
        text,
      }: {
        roomId: string;
        text: string;
      }) => {
        const roomUsers = await getDocumentUsers({
          roomId,
          currentUser: user?.emailAddresses[0]?.emailAddress ?? "",
          text,
        });

        return roomUsers;
      }}
    >
      <ClientSideSuspense fallback={<Loader />}>{children}</ClientSideSuspense>
    </LiveblocksProvider>
  );
}
