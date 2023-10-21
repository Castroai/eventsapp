import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  return (
    <div className="mx-auto container">
      <h2>My Amazing App</h2>

      {session && (
        <div>
          <p>Signed in as {session.user && session.user.name}</p>
          <a href="/api/auth/signout">Sign out by link</a>
        </div>
      )}

      {!session && <p>Not signed in</p>}
    </div>
  );
}
