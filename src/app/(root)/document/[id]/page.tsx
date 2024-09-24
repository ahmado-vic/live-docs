import { getDocument } from "@/app/actions/room.action";
import { getUsers } from "@/app/actions/user.action";
import { CollaborativeRoom } from "@/components/CollaborativeRoom";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import type { RoomMetadata, SearchParamProps, User } from "types";

async function Document({ params: { id } }: SearchParamProps) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const room = await getDocument({
    roomId: id!,
    userId: user.emailAddresses[0]?.emailAddress ?? "",
  });

  if (!room) redirect("/");

  const userIds = Object.keys(room.usersAccesses);
  const users = await getUsers({ userIds });
  const usersData = users?.map((user) => ({
    ...user,
    userType: room.usersAccesses?.[user?.email ?? ""]?.includes("room:write")
      ? "editor"
      : "viewer",
  }));

  const currentUserType = room.usersAccesses?.[
    user?.emailAddresses[0]?.emailAddress ?? ""
  ]?.includes("room:write")
    ? "editor"
    : "viewer";

  return (
    <main>
      <CollaborativeRoom
        roomId={id ?? ""}
        roomMetadata={room.metadata as RoomMetadata}
        users={(usersData as User[]) ?? []}
        currentUserType={currentUserType}
      />
    </main>
  );
}

export default Document;
