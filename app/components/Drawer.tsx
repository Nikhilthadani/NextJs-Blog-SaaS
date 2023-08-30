"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import Logo from "./Logo";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { MdOutlineNavigateNext } from "react-icons/md";
const authlinks = [
  { id: "1-1", name: "Blogs", url: "/blogs" },
  { id: "1-2", name: "Write", url: "/blogs/add" },
  { id: "1-3", name: "Profile", url: "/profile" },
  { id: "1-4", name: "Search", url: "/search" },
];
const nonAuthLinks = [
  { id: "2-1", name: "Blogs", url: "/blogs" },
  { id: "2-2", name: "Login", url: "/api/auth/signin" },
  { id: "2-3", name: "Register", url: "/register" },
];
export function Drawer() {
  const { status } = useSession();
  return (
    <Sheet>
      <SheetTrigger>
        <MenuIcon size={40} className="p-2 hover:bg-gray-200 rounded-full" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="mx-auto my-5">
            <Logo />
          </SheetTitle>

          <div className="flex flex-col w-full justify-start items-center">
            {(status === "authenticated" ? authlinks : nonAuthLinks).map(
              (item) => (
                <Link
                  className="bg-gray-100 rounded-xl flex items-center w-full px-10 py-3 my-1 hover:bg-violet-500 font-bold hover:text-white duration-300"
                  href={item.url}
                  key={item.id}
                >
                  {item.name}
                  <span className="ml-auto">
                    <MdOutlineNavigateNext size={30} />
                  </span>
                </Link>
              )
            )}
            {status === "authenticated" && (
              <button
                className="my-2 w-full font-bold bg-slate-100 hover:bg-slate-200 rounded-xl px-4 py-2  text-xl "
                onClick={() => signOut()}
              >
                Logout
              </button>
            )}
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
