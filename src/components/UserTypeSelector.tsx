import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { UserType, UserTypeSelectorParams } from "types";
import { updateDocAccess } from "@/app/actions/room.action";

function UserTypeSelector({
  roomId,
  userType,
  setUserType,
  email,
}: UserTypeSelectorParams) {
  return (
    <div>
      <Select
        onValueChange={async (value: UserType) => {
          setUserType(value);
          await updateDocAccess(roomId!, email!, value);
        }}
        value={userType}
      >
        <SelectTrigger className="shad-select">
          <SelectValue placeholder="user type" />
        </SelectTrigger>
        <SelectContent className="border-none bg-dark-200">
          <SelectItem value="viewer" className="shad-select-item">
            Can View
          </SelectItem>
          <SelectItem value="editor" className="shad-select-item">
            Can Edit
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default UserTypeSelector;
