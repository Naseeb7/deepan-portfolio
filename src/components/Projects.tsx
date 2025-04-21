"use client";

import { Projectcategory, ProjectType } from "@/constants/enums";
import { fetchAllProjects } from "@/utils/serverActions";
import { useEffect, useState } from "react";
import Header from "./ui/Header";
import { ProjectCategories } from "@/constants/defaultState";
import ProjectCard from "./ui/ProjectCard";

const Projects = ({ initialProjects }: { initialProjects: ProjectType[] }) => {
  const [projects, setProjects] = useState<ProjectType[]>(initialProjects);
  // const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<string>(Projectcategory.ALL);

  useEffect(() => {
    const fetchCategoryProjects = async () => {
      // setLoading(true);
      const response = await fetchAllProjects(category);
      setProjects(response);
      // setLoading(false);
    };

    if (category !== Projectcategory.ALL) {
      fetchCategoryProjects();
    } else {
      setProjects(initialProjects);
    }
  }, [category, initialProjects]);
  return (
    <section className="flex flex-col p-10">
      <Header text="Projects" />
      <div className="flex gap-10 mb-6">
        {ProjectCategories.map((cat, i) => {
          return (
            <span
              onClick={() => setCategory(cat.value)}
              key={i}
              className={`text-xl font-medium hover:cursor-pointer ${
                category === cat.value ? "text-secondary-100" : ""
              }`}
            >
              {cat.label}
            </span>
          );
        })}
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <ProjectCard key={i} {...project} />
        ))}
      </ul>
    </section>
  );
};

export default Projects;
