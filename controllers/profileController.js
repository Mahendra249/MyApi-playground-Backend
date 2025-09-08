import Profile from "../models/profile.js";
export const createProfile = async (req, res) => {
  try {
    const data = req.body;
    const profileExist = await Profile.findOne();

    if (profileExist) {
      return res.status(400).json({ message: "Profile already exist." });
    }

    const profile = new Profile(data);
    await profile.save();
    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const data = req.body;
    const profile = await Profile.findOneAndUpdate({}, data, { new: true });
    if (!profile) {
      return res
        .status(404)
        .json({ message: "Profile not found. Create one first." });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    const profile = await Profile.findOneAndDelete();
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const getProjectsBySkill = async (req, res) => {
  try {
    const { skill } = req.query;
    const profile = await Profile.findOne();
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    const projects = profile.projects.filter(
      (p) =>
        profile.skills.includes(skill) ||
        p.description.toLowerCase().includes(skill.toLowerCase())
    );
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTopSkills = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    res.status(200).json(profile.skills.slice(0, 3));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const searchProfile = async (req, res) => {
  try {
    const { q } = req.query;
    const profile = await Profile.findOne();
    if (!profile) return res.status(404).json({ message: "Profile not found" });

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

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const healthCheck = (req, res) => {
  res.json({ status: "ok" });
};
