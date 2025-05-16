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
import AllProjectsSkeleton from "./ui/AllProjectsSkeleton";
import SingleProjectSkeleton from "./ui/SingleProjectSkeleton";
import { useAuth } from "@/contexts/AuthContext";

const Projects = ({ initialProjects }: { initialProjects: ProjectType[] }) => {
  const { isAdmin } = useAuth();
  const [projects, setProjects] = useState<ProjectType[]>(initialProjects);
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(
    null
  );

  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<string>(Projectcategory.ALL);
  const [projectLoading, setProjectLoading] = useState(false);

  useEffect(() => {
    console.log("object", projects);
  }, [projects]);

  useEffect(() => {
    setLoading(true);
    const fetchCategoryProjects = async () => {
      const response = await fetchAllProjects(category);
      setProjects(response);
    };

    if (category !== Projectcategory.ALL) {
      fetchCategoryProjects();
    } else {
      setProjects(initialProjects);
    }
    setLoading(false);
  }, [category, initialProjects]);

  const handleProjectClick = async (id: string) => {
    setProjectLoading(true);
    setSelectedProject(null); // Open the modal immediately
    const response = await fetchProjectById(id);
    setSelectedProject(response);
    setProjectLoading(false);
  };

  useEffect(() => {
    if (selectedProject || projectLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedProject, projectLoading]);

  return (
    <section className="flex flex-col p-10 w-full">
      <Header text="Projects" />
      <div className="flex justify-between mb-6 items-center w-full">
        <div className="flex gap-10">
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
        {isAdmin && (
          <div
            onClick={() => {
              window.location.href = "/project/add";
            }}
            className="flex px-6 py-1 justify-center rounded-xl bg-secondary-100 hover:cursor-pointer hover:bg-secondary-100/80"
          >
            Add Project
          </div>
        )}
      </div>

      {loading ? (
        <AllProjectsSkeleton />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {projects.map((project, i) => (
            <div
              onClick={() => handleProjectClick(project.id)}
              className="hover:cursor-pointer flex w-full"
              key={i}
            >
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      )}

      {(selectedProject || projectLoading) && (
        <div className="flex fixed top-0 left-0 right-0 bottom-0 bg-brand-100 px-20 py-10 bg-opacity-50 z-50 animate-slide-up overflow-auto">
          <Image
            onClick={() => setSelectedProject(null)}
            src={CrossIcon}
            alt="Close"
            className="absolute top-18 right-28 hover:cursor-pointer z-60"
          />
          {projectLoading ? (
            <SingleProjectSkeleton />
          ) : (
            selectedProject && <ProjectSection {...selectedProject} />
          )}
        </div>
      )}
    </section>
  );
};

export default Projects;
