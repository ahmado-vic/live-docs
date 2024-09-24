import AddDocumentButton from "@/components/AddDocumentButton";
import Header from "@/components/Header";
import SingleDoc from "@/components/SingleDoc";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import { HydrateClient } from "src/trpc/server";
import { getRoomsByUser } from "../actions/room.action";
import Notification from "@/components/Notification";

export default async function Home() {
  const user = await currentUser();
  if (!user) return redirect("/sign-in");

  const rooms = await getRoomsByUser(user.id);

  return (
    <HydrateClient>
      <main className="home-container">
        <Header className="sticky left-0 top-0 z-50">
          <div className="flex w-fit items-center justify-between gap-2 lg:gap-4">
            <Notification />
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </Header>
        {rooms && rooms?.length > 0 ? (
          <div className="document-list-container">
            <div className="document-list-title">
              <h3 className="text-28-semibold">All documents</h3>
              <AddDocumentButton
                userId={user.id}
                email={user.emailAddresses[0]?.emailAddress ?? ""}
              />
            </div>
            <ul className="document-ul">
              {rooms?.map((document) => (
                <li key={document.id}>
                  <SingleDoc document={document} />
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="document-list-empty">
            <Image
              src="../../assets/icons/doc.svg"
              alt="Document"
              width={40}
              height={40}
            />
            <AddDocumentButton
              userId={user.id}
              email={user.emailAddresses[0]?.emailAddress ?? ""}
            />
          </div>
        )}
      </main>
    </HydrateClient>
  );
}
