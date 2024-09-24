import { liveblocks } from "@/lib/liveblocks";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  const clerkUser = await currentUser();

  if (!clerkUser) redirect("/sign-in");

  // Get the current user from your database
  const user = {
    id: clerkUser.id,
    info: {
      id: clerkUser.id,
      name: `${clerkUser.firstName} ${clerkUser.lastName}`,
      email: clerkUser.emailAddresses[0]?.emailAddress ?? "",
      avatar: clerkUser.imageUrl,
      color: "#" + Math.floor(Math.random() * 16777215).toString(16), // Generate a random color
    },
  };

  // Identify the user and return the result
  const { status, body } = await liveblocks.identifyUser(
    {
      userId: user.info.email,
      groupIds: [], // Add an empty array for groupIds
    },
    { userInfo: user.info },
  );

  return new Response(body, { status });
}
