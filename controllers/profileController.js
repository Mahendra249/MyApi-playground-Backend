import Profile from "../models/profile.js";

export const createProfile = async (req, res) => {
  try {
    const data = req.body;
    const profileExist = await Profile.findOne({ email: data.email });

    if (profileExist) {
      return res.status(400).json({
        success: false,
        message: "Profile already exists with this email.",
      });
    }

    const profile = new Profile(data);
    await profile.save();

    res.status(201).json({
      success: true,
      message: "Profile created successfully.",
      data: profile,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const data = req.body;
    const profile = await Profile.findOneAndUpdate({}, data, { new: true });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found. Create one first.",
      });
    }

    res.json({
      success: true,
      message: "Profile updated successfully.",
      data: profile,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) {
      return res
        .status(404)
        .json({ success: false, message: "Profile not found" });
    }

    res.status(200).json({
      success: true,
      message: "Profile fetched successfully.",
      data: profile,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    const profile = await Profile.findOneAndDelete();
    if (!profile) {
      return res
        .status(404)
        .json({ success: false, message: "Profile not found" });
    }

    res.status(200).json({
      success: true,
      message: "Profile deleted successfully.",
      data: profile,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getProjectsBySkill = async (req, res) => {
  try {
    const { skill } = req.query;
    const profile = await Profile.findOne();
    if (!profile)
      return res
        .status(404)
        .json({ success: false, message: "Profile not found" });

    const projects = profile.projects.filter(
      (p) =>
        profile.skills.includes(skill) ||
        p.description.toLowerCase().includes(skill.toLowerCase())
    );

    res.json({
      success: true,
      message: "Projects fetched successfully.",
      data: projects,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getTopSkills = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile)
      return res
        .status(404)
        .json({ success: false, message: "Profile not found" });

    res.status(200).json({
      success: true,
      message: "Top skills fetched successfully.",
      data: profile.skills.slice(0, 3),
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const searchProfile = async (req, res) => {
  try {
    const { q } = req.query;
    const profile = await Profile.findOne();
    if (!profile)
      return res
        .status(404)
        .json({ success: false, message: "Profile not found" });

    const results = {
      skills: profile.skills.filter((s) =>
        s.toLowerCase().includes(q.toLowerCase())
      ),
      projects: profile.projects.filter(
        (p) =>
          p.title.toLowerCase().includes(q.toLowerCase()) ||
          p.description.toLowerCase().includes(q.toLowerCase())
      ),
      work: profile.work.filter((w) =>
        w.toLowerCase().includes(q.toLowerCase())
      ),
    };

    res.status(200).json({
      success: true,
      message: "Search completed successfully.",
      data: results,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const healthCheck = (req, res) => {
  res.json({
    success: true,
    status: "ok",
    message: "API is healthy and running.",
  });
};
