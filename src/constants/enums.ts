export enum Projectcategory {
  ALL = "all",
  APPLICATION = "application",
  WEBDESIGN = "web-design",
  DASHBOARD = "dashboard",
}

export type ProjectType = {
  id: string;
  name: string;
  heroImage: string;
  category: string;
};
