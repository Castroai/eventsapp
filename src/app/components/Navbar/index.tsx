import { authOptions } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";

export default async function DefaultNavbar() {
  const session = await getServerSession(authOptions);
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Events App</a>
      </div>
      {session ? (
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end flex items-center gap-2">
            <p>{session.user?.name}</p>

            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <Image
                  src={session.user!.image!}
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
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <Link href={"/dashboard/account"}>Settings</Link>
              </li>
              <li>
                <Link href={"/api/auth/signout"}>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="flex-none gap-2">
          <ul tabIndex={0}>
            <li>
              <Link href={"/api/auth/signin"} className="btn btn-primary">
                Sign in
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
