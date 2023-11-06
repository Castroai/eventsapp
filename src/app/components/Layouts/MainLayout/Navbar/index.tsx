import { authOptions } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineLogin } from "react-icons/ai";
export default async function DefaultNavbar() {
  const session = await getServerSession(authOptions);
  return (
    <div className="navbar bg-base-100 container mx-auto">
      <div className="flex-1">
        <Link href={"/"} className="btn btn-ghost normal-case text-xl">
          Events App
        </Link>
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
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href={"/dashboard"} className="justify-between">
                  Dashboard
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <Link href={"/api/auth/signout"}>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <>
          <div className="">
            <Link href={"/api/auth/signin"} className="flex gap-2 items-center">
              <span>Sign In</span>
              <AiOutlineLogin className="w-5 h-5" />
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
