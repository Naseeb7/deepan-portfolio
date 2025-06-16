import { ProjectType } from "@/constants/enums";
import { Schema, model, models } from "mongoose";

const ProjectSchema = new Schema({
  type: { type: String, required: true, enum: ProjectType },
  name: { type: String, required: true },
  heroImage: String,
  overview: String,
  challenge: String,
  photos: [String],
  details: [String],
  url: String,
  category: String,
});

const Project = models.Project || model("Project", ProjectSchema);

export default Project;
