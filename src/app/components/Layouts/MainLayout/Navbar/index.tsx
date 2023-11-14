import { SignInBUtton } from "@/app/components/SignInButton";
import { SignOutButton } from "@/app/components/SignoutButton";
import { ThemeButton } from "@/app/components/ThemeButton";
import { authOptions } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
export default async function DefaultNavbar() {
  const session = await getServerSession(authOptions);
  return (
    <div className=" h-20  bg-neutral text-neutral-content ">
      <div className="navbar container mx-auto flex items-center justify-between h-full ">
        <Link href={"/"} className="btn btn-ghost normal-case text-xl">
          Events App
        </Link>
        <ThemeButton />
        <div className="w-full flex justify-center">
          <input
            type="text"
            placeholder="Search for an event"
            className="input input-bordered w-1/2"
          />
        </div>
        {session ? (
          <div className="flex-none gap-2">
            <div className="form-control">
              <p>{session?.user?.name}</p>
            </div>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <Image
                    src={session?.user?.image ?? ""}
                    alt={"Google Profile Picture"}
                    width={20}
                    height={20}
                  ></Image>
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-neutral  rounded-box w-52"
              >
                <li>
                  <Link href={"/dashboard"} className="justify-between">
                    Dashboard
                    {/* <span className="badge">New</span> */}
                  </Link>
                </li>
                <li>
                  <div className="flex justify-between">
                    <p>Theme</p> <ThemeButton />
                  </div>
                </li>
                <li>
                  {/* <Link href={"/api/auth/signout"}>Logout</Link> */}
                  <SignOutButton />
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <>
            <div className="">
              {/* <SignInBUtton /> */}
              <Link href={"/login"}>Log in </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
