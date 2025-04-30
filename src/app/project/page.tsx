import Projects from "@/components/Projects";
import { fetchAllProjects } from "@/utils/serverActions.ut";

export const revalidate = 604800; // Revalidate every 7 days

const ProjectsPage = async () => {
  const projects = await fetchAllProjects();

  return (
    <section>
      <Projects initialProjects={projects} />
    </section>
  );
};

export default ProjectsPage;
