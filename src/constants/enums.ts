export enum Projectcategory {
  ALL = "all",
  APPLICATION = "application",
  WEBDESIGN = "web-design",
  DASHBOARD = "dashboard",
}

export type ProjectFieldTypes = {
  id: string;
  type: ProjectType;
  name: string;
  heroImage: string;
  category: string;
  overview: string;
  challenge: string;
  photos: string[];
  details: string[];
  url: string;
};

export enum ProjectType {
  PROJECT = "project",
  CASE_STUDY = "case_study",
}

export enum RevalidateTags {
  PROJECTS = "projects",
  SINGLEPROJECTS = "singleProjects",
}
