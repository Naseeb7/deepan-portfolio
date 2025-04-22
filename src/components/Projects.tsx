"use client";

import { Projectcategory, ProjectType } from "@/constants/enums";
import { fetchAllProjects, fetchProjectById } from "@/utils/serverActions.ut";
import { useEffect, useState } from "react";
import Header from "./ui/Header";
import { ProjectCategories } from "@/constants/defaultState";
import ProjectCard from "./ui/ProjectCard";
import ProjectSection from "./ProjectSection";
import CrossIcon from "@/assets/CrossIcon.svg";
import Image from "next/image";

const Projects = ({ initialProjects }: { initialProjects: ProjectType[] }) => {
  const [projects, setProjects] = useState<ProjectType[]>(initialProjects);
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(
    null
  );
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

  const handleProjectClick = async (id: string) => {
    // Handle project click event here
    const response = await fetchProjectById(id);
    setSelectedProject(response);
  };

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedProject]);

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {projects.map((project, i) => (
          <div
            onClick={() => handleProjectClick(project.id)}
            className="hover:cursor-pointer"
            key={i}
          >
            <ProjectCard {...project} />
          </div>
        ))}
      </div>
      {selectedProject && (
        <div className="flex fixed top-0 left-0 right-0 bottom-0 bg-brand-100 px-20 py-10 bg-opacity-50 z-50 animate-slide-up overflow-auto ">
          <Image
            onClick={() => setSelectedProject(null)}
            src={CrossIcon}
            alt="Close"
            className="absolute top-18 right-28 hover:cursor-pointer z-60"
          />
          <ProjectSection {...selectedProject} />
        </div>
      )}
    </section>
  );
};

export default Projects;
