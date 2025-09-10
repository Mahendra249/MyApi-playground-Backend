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

    if (!skill) {
      return res.status(400).json({
        success: false,
        message: "Please provide a search keyword.",
      });
    }

    const profile = await Profile.findOne();
    if (!profile) {
      return res
        .status(404)
        .json({ success: false, message: "Profile not found" });
    }

    const normalizedSkill = skill.toLowerCase();

    const projects = profile.projects.filter(
      (p) =>
        p.title?.toLowerCase().includes(normalizedSkill) ||
        p.description?.toLowerCase().includes(normalizedSkill)
    );

    return res.status(200).json({
      success: true,
      message:
        projects.length > 0
          ? "Projects fetched successfully."
          : `No projects found with keyword: ${skill}`,
      data: projects,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getTopSkills = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) {
      return res
        .status(404)
        .json({ success: false, message: "Profile not found" });
    }

    const topSkills = profile.skills.slice(0, 3);

    res.status(200).json({
      success: true,
      message: "Top skills fetched successfully.",
      data: topSkills,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const searchProfile = async (req, res) => {
  try {
    const { q } = req.query;

    const profile = await Profile.findOne();
    if (!profile) {
      return res
        .status(404)
        .json({ success: false, message: "Profile not found" });
    }

    const lowerQ = q.toLowerCase();

    const results = {
      name: profile.name.toLowerCase().includes(lowerQ) ? profile.name : null,
      email: profile.email.toLowerCase().includes(lowerQ)
        ? profile.email
        : null,
      education: profile.education.toLowerCase().includes(lowerQ)
        ? profile.education
        : null,
      skills: profile.skills.filter((s) => s.toLowerCase().includes(lowerQ)),
      projects: profile.projects.filter(
        (p) =>
          p.title.toLowerCase().includes(lowerQ) ||
          p.description.toLowerCase().includes(lowerQ)
      ),
      work: profile.work.filter((w) => w.toLowerCase().includes(lowerQ)),
    };

   
    const hasResults =
      results.name ||
      results.email ||
      results.education ||
      results.skills.length > 0 ||
      results.projects.length > 0 ||
      results.work.length > 0;

    if (!hasResults) {
      return res.status(200).json({
        success: true,
        message: "No results found",
        data: {},
      });
    }

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
