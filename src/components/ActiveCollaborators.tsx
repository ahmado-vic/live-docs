import { useOthers } from "@liveblocks/react/suspense";
import Image from "next/image";

function ActiveCollaborators() {
  const others = useOthers();
  const collaborators = others.map((other) => other.info);

  if (collaborators.length === 0) {
    return null;
  }

  return (
    <ul>
      {collaborators.map((collaborator) => {
        return (
          <li key={collaborator.id}>
            <div className="flex items-center gap-2">
              <div className="relative h-8 w-8">
                <Image
                  src={collaborator.avatar}
                  alt={collaborator.name}
                  width={100}
                  height={100}
                  className={`h-full w-full rounded-full ring-2 ring-${collaborator.color}`}
                />
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default ActiveCollaborators;
