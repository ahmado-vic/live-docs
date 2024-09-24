"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { InboxNotification, InboxNotificationList } from "@liveblocks/react-ui";
import {
  useInboxNotifications,
  useUnreadInboxNotificationsCount,
} from "@liveblocks/react/suspense";
import Image from "next/image";

export default function Notification() {
  const { inboxNotifications } = useInboxNotifications();
  const { count } = useUnreadInboxNotificationsCount();

  const unreadNotifications = inboxNotifications.filter(
    (notification) => !notification.readAt,
  );
  return (
    <Popover>
      <PopoverTrigger className="relative flex h-10 w-10 items-center justify-center rounded-lg">
        <Image
          src="/assets/icons/bell.svg"
          alt="inbox"
          width={24}
          height={24}
        />
        {count > 0 && (
          <div className="absolute right-3 top-2 h-2 w-2 rounded-full bg-red-500" />
        )}
      </PopoverTrigger>
      <PopoverContent>
        <InboxNotificationList>
          {unreadNotifications.length <= 0 ? (
            <p className="py-2 text-center text-dark-500">
              no new notifications
            </p>
          ) : (
            unreadNotifications.map((notification) => (
              <InboxNotification
                key={notification.id}
                inboxNotification={notification}
                className="bg-dark-200 text-white"
                href={`/document/${notification.roomId}`}
                kinds={{
                  thread: (props) => (
                    <InboxNotification.Thread
                      {...props}
                      showRoomName={false}
                      showActions={false}
                    />
                  ),
                  textMention: (props) => (
                    <InboxNotification.TextMention
                      {...props}
                      showRoomName={false}
                    />
                  ),
                  $myCustomNotification: (props) => (
                    <InboxNotification.Custom
                      {...props}
                      title={props.inboxNotification.activities[0]?.data?.title}
                      aside={
                        <InboxNotification.Icon>
                          <Image
                            src={
                              (props.inboxNotification.activities[0]?.data
                                ?.avatar as string) ?? ""
                            }
                            alt="acatar"
                            width={36}
                            height={36}
                            className="rounded-full"
                          />
                          {props.children}
                        </InboxNotification.Icon>
                      }
                    >
                      My custom notification
                    </InboxNotification.Custom>
                  ),
                }}
              ></InboxNotification>
            ))
          )}
        </InboxNotificationList>
      </PopoverContent>
    </Popover>
  );
}
