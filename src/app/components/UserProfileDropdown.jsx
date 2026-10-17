"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar, Dropdown, Label } from "@heroui/react";
import { ChevronDown, LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";

const UserProfileDropdown = ({ user, onNavigate }) => {
  const router = useRouter();

  const getFallbackName = () => {
    if (user?.name) {
      return user.name.trim().charAt(0).toUpperCase();
    }
    return "M";
  };

  const handleSignOut = async () => {
    await authClient.signOut();
    onNavigate?.();
    router.push("/");
  };

  const handleAction = (key) => {
    if (key === "profile") {
      onNavigate?.();
      router.push("/profile");
      return;
    }
    if (key === "logout") {
      handleSignOut();
    }
  };

  return (
    <Dropdown>
      <Dropdown.Trigger
        aria-label="User menu"
        className="flex items-center gap-2.5 pl-1 pr-2 h-9 rounded-full bg-surface-container hover:bg-surface-container-high transition-colors cursor-pointer"
      >
        <Avatar className="w-7 h-7">
          <Avatar.Image
            alt={user?.name || "User"}
            src={user?.image}
            referrerPolicy="no-referrer"
          />
          <Avatar.Fallback>{getFallbackName()}</Avatar.Fallback>
        </Avatar>
        <div className="text-left hidden lg:block max-w-[120px]">
          <p className="text-label-md text-on-surface leading-none truncate">
            {user?.name}
          </p>
        </div>
        <ChevronDown className="w-4 h-4 text-on-surface-variant hidden sm:block shrink-0" />
      </Dropdown.Trigger>
      <Dropdown.Popover placement="bottom end" className="min-w-[180px]">
        <Dropdown.Menu onAction={handleAction}>
          <Dropdown.Item id="profile" textValue="Profile">
            <User className="w-4 h-4 text-primary" />
            <Label>Profile</Label>
          </Dropdown.Item>
          <Dropdown.Item id="logout" textValue="Sign Out" variant="danger">
            <LogOut className="w-4 h-4" />
            <Label>Sign Out</Label>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
};

export default UserProfileDropdown;
