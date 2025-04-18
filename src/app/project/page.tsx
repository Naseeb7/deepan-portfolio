import Projects from "@/components/Projects";

const fetchProjects = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/graphql`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
        query GetAllProjects {
          projects {
            id
            name
            heroImage
            overview
          }
        }
      `,
      }),
      cache: "no-store", // Prevent caching for fresh data on every request
    }
  );

  const { data } = await response.json();
  return data.projects;
};

const ProjectsPage = async () => {
  const projects = await fetchProjects();

  return (
    <section>
      <Projects projects={projects} />
    </section>
  );
};

export default ProjectsPage;
