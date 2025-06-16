import AddProjectPageComponent from "@/components/AddProjectComponent";
import { fetchProjectById } from "@/utils/serverActions.ut";

export const revalidate = 0;

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params;
  const project = await fetchProjectById(id, "no-cache");

  return <AddProjectPageComponent existingProject={project} />;
}
