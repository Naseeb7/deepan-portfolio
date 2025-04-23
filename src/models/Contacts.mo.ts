import { Schema, model, models } from "mongoose";

const ContactSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Contact = models.Contact || model("Contact", ContactSchema);

export default Contact;
