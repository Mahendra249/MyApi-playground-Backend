import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  link: [String],
});

const profileSchema = new mongoose.Schema({
  name: String,
  email: String,
  education: String,
  skills: [String],
  projects: [projectSchema],
  work: [String],
  links: {
    github: String,
    linkedin: String,
    portfolio: String,
  },
});

const Profile = mongoose.model("Profile", profileSchema);
export default Profile;
