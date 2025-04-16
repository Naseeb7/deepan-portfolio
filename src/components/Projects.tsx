"use client";

type Project = {
  id: string;
  name: string;
  heroImage: string;
  overview: string;
};

const Projects = ({ projects }: { projects: Project[] }) => {
  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <li
            key={project.id}
            className="border rounded-lg p-4 shadow-md hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">{project.name}</h2>
            {project.heroImage && (
              <img
                src={project.heroImage}
                alt={project.name}
                className="w-full h-48 object-cover rounded-md mt-2"
              />
            )}
            <p className="text-gray-600 mt-2">{project.overview}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Projects;
