"use server";

import { liveblocks } from "@/lib/liveblocks";
import { parseStringify } from "@/lib/utils";
import { clerkClient } from "@clerk/nextjs/server";

export const getUsers = async ({ userIds }: { userIds: string[] }) => {
  try {
    const { data } = await clerkClient.users.getUserList({
      emailAddress: userIds,
    });
    const users = data.map((user) => {
      return {
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.emailAddresses[0]?.emailAddress,
        avatar: user.imageUrl,
      };
    });

    const sortedUsers = userIds.map((email) => {
      return users.find((user) => user.email === email);
    });

    return parseStringify(sortedUsers);
  } catch (error) {
    console.log(`Error getting users: ${error as string}`);
  }
};

export const getDocumentUsers = async ({
  roomId,
  currentUser,
  text,
}: {
  roomId: string;
  currentUser: string;
  text: string;
}) => {
  try {
    //get room
    const room = await liveblocks.getRoom(roomId);

    //get mention users
    const users = Object.keys(room.usersAccesses).filter(
      (email) => email !== currentUser,
    );

    //check if there is a mention text
    if (text.length > 0) {
      const loweredCaseText = text.toLowerCase();
      const filteredUsers = users.filter((email: string) =>
        email.toLowerCase().includes(loweredCaseText),
      );

      return parseStringify(filteredUsers);
    }
  } catch (error) {
    console.log(`Failed to fetch users document ${error as string}`);
  }
};
