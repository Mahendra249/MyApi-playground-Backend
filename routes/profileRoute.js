import express from "express";
import {
  getProfile,
  getProjectsBySkill,
  getTopSkills,
  searchProfile,
  healthCheck,
  createProfile,
  updateProfile,
  deleteProfile,
} from "../controllers/profileController.js";

const router = express.Router();

router.post("/createProfile", createProfile);
router.put("/updateProfile", updateProfile);
router.get("/profile", getProfile);
router.delete("/deleteProfile", deleteProfile);
router.get("/projects", getProjectsBySkill);
router.get("/search", searchProfile);
router.get("/skills/top", getTopSkills);
router.get("/health", healthCheck);

export default router;
