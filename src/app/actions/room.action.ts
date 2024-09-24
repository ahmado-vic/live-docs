"use server";

import { liveblocks } from "@/lib/liveblocks";
import { parseStringify } from "@/lib/utils";
import { clerkClient, type User } from "@clerk/nextjs/server";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import type { AccessType, CreateDocumentParams, RoomAccesses } from "types";

// Create a new document
export const createDocument = async ({
  userId,
  email,
}: CreateDocumentParams) => {
  const roomId = nanoid();

  try {
    const metadata = {
      creatorId: userId,
      email,
      title: "Untitled",
    };
    const usersAccesses: RoomAccesses = {
      [email]: ["room:write"],
    };
    const room = await liveblocks.createRoom(roomId, {
      metadata,
      usersAccesses,
      defaultAccesses: [],
    });

    revalidatePath("/");

    return parseStringify(room);
  } catch (error) {
    console.log(`Error creating document: ${error as string}`);
  }
};

// Get a document
export const getDocument = async ({
  roomId,
  userId,
}: {
  roomId: string;
  userId: string;
}) => {
  try {
    const room = await liveblocks.getRoom(roomId);

    const hasAccess = Object.keys(room.usersAccesses).includes(userId);
    if (!hasAccess) {
      throw new Error("You do not have access to this document");
    }

    return parseStringify(room);
  } catch (error) {
    console.log(`Error getting document: ${error as string}`);
  }
};

// Get all rooms by user
export const getRoomsByUser = async (userId: string) => {
  try {
    const roomsData = await liveblocks.getRooms();
    const rooms = roomsData.data.filter(
      (room) => room.metadata.creatorId === userId,
    );
    return parseStringify(rooms);
  } catch (error) {
    console.log(`Error getting rooms: ${error as string}`);
  }
};

// Update room title
export const updateRoomTitle = async ({
  roomId,
  title,
}: {
  roomId: string;
  title: string;
}) => {
  try {
    const room = await liveblocks.updateRoom(roomId, {
      metadata: {
        title,
      },
    });

    revalidatePath(`/document/${roomId}`);
    return parseStringify(room);
  } catch (error) {
    console.log(`Error updating room title: ${error as string}`);
  }
};

// Delete room
export const deleteRoom = async ({ roomId }: { roomId: string }) => {
  try {
    await liveblocks.deleteRoom(roomId);
    revalidatePath("/");
  } catch (error) {
    console.log(`Error deleting document: ${error as string}`);
  }
};

// Update document access
export const updateDocAccess = async (
  roomId: string,
  email: string,
  userType: string,
) => {
  const getAccessType = (userType: string) => {
    switch (userType) {
      case "creator":
        return ["room:write"];
      case "editor":
        return ["room:write"];
      case "viewer":
        return ["room:read", "room:presence:write"];
      default:
        return ["room:read", "room:presence:write"];
    }
  };

  try {
    //check if user is already found
    const { data: users } = await clerkClient.users.getUserList();
    const userFound = users.find(
      (user: User) => user.emailAddresses[0]?.emailAddress === email,
    );

    if (!userFound) throw new Error("User not found");

    const room = await liveblocks.updateRoom(roomId, {
      usersAccesses: {
        [email]: getAccessType(userType) as AccessType,
      },
    });

    revalidatePath(`/document/${roomId}`);
    return parseStringify(room);
  } catch (error) {
    console.log(`Error updating document access: ${error as string}`);
    return parseStringify({ errorMsg: (error as Error).message });
  }
};

// Remove collaborator
export const removeCollaborator = async (roomId: string, email: string) => {
  try {
    const room = await liveblocks.getRoom(roomId);

    if (room.metadata.creatorId === email) {
      throw new Error("You cannot remove yourself as a collaborator");
    }

    const updatedRoom = await liveblocks.updateRoom(roomId, {
      usersAccesses: {
        [email]: null,
      },
    });

    revalidatePath(`/document/${roomId}`);
    return parseStringify(updatedRoom);
  } catch (error) {
    console.log(`Error removing collaborator: ${error as string}`);
  }
};
