import Projects from "@/components/Projects";
import { fetchAllProjects } from "@/utils/serverActions";

const ProjectsPage = async () => {
  const projects = await fetchAllProjects();

  return (
    <section>
      <Projects initialProjects={projects} />
    </section>
  );
};

export default ProjectsPage;
