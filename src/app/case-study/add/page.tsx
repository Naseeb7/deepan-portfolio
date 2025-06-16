import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AddProjectPageComponent from "@/components/AddProjectComponent";
import { ProjectType } from "@/constants/enums";

export const revalidate = 604800; // Revalidate every 7 days

const AddProjectPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/auth/login"); // Or show a 401 message
  }

  return (
    <section className="flex w-full">
      <AddProjectPageComponent type={ProjectType.CASE_STUDY} />
    </section>
  );
};

export default AddProjectPage;
