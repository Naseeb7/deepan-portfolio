import Projects from "@/components/Projects";
import { ProjectType } from "@/constants/enums";
import { fetchAllProjects } from "@/utils/serverActions.ut";

export const revalidate = 604800; // Revalidate every 7 days

const CaseStudyPage = async () => {
  const projects = await fetchAllProjects(ProjectType.CASE_STUDY);

  return (
    <section className="flex  w-full">
      <Projects initialProjects={projects} type={ProjectType.CASE_STUDY} />
    </section>
  );
};

export default CaseStudyPage;
