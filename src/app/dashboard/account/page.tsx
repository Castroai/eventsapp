import DashboardLayout from "@/app/components/Layouts/DashboardLayout";
import prisma from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { stripe } from "@/app/lib/stripe";
import Stripe from "stripe";
import { fetchOrCreateStripeConnectLink } from "@/app/actions";

export default async function AccountPage() {
  const session = await getServerSession(authOptions);
  let status: Stripe.Account | null;

  const prismaUser = await prisma.user.findUnique({
    where: {
      id: session!.user!.id,
    },
  });
  if (prismaUser?.stripeAccountId) {
    status = await stripe().accounts.retrieve(prismaUser.stripeAccountId);
  } else {
    status = null;
  }

  return (
    <DashboardLayout>
      <div className="p-4 ">
        <div className="card">
          <div>
            <p className="text-lg">Setup Stripe Account</p>
            <p className="text-sm">
              In order to receive payments from your ticket sales, you will need
              to set up an account with stripe our payment processor.
            </p>
          </div>
          <div>
            <p> Current Status of details_submitted :</p>
            <p>{status && JSON.stringify(status.details_submitted)}</p>
          </div>
          <form action={fetchOrCreateStripeConnectLink}>
            <button className="btn btn-neutral" type="submit">
              Create Stripe Account
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
