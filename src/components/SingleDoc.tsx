"use client";
import { formatDistanceToNowStrict } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import type { SingleDocProps } from "types";
import DeleteBtn from "./DeleteBtn";

function SingleDoc({ document }: SingleDocProps) {
  return (
    <article className="document-list-item">
      <Link
        href={`/document/${document.id}`}
        className="flex items-center gap-4"
      >
        <div className="w-fit">
          <Image
            src="../assets/icons/doc.svg"
            alt={document.metadata.title as string}
            width={50}
            height={50}
          />
        </div>
        <div className="">
          <h1 className="document-list-title">{document.metadata.title}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            created about{" "}
            {formatDistanceToNowStrict(new Date(document.createdAt))}
          </p>
        </div>
      </Link>
      <div>
        <DeleteBtn roomId={document.id} />
      </div>
    </article>
  );
}

export default SingleDoc;
