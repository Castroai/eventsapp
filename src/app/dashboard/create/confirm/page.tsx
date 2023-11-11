import DashboardLayout from "@/app/components/Layouts/DashboardLayout";
import MainForm from "../components/FormLayout";
import prisma from "@/app/lib/db";
import { redirect } from "next/navigation";

const Confirm = ({
  params,
  searchParams,
}: {
  params: any;
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const submit = async () => {
    "use server";
    const data = await prisma.event.update({
      where: {
        id: parseInt(searchParams.event as string),
      },
      data: {
        status: "PUBLISHED",
      },
    });
    redirect("/dashboard");
  };
  return (
    <DashboardLayout>
      <MainForm>
        <form action={submit}>
          <div>
            <button type="submit" className="btn btn-primary">
              Publish
            </button>
          </div>
        </form>
      </MainForm>
    </DashboardLayout>
  );
};

export default Confirm;
