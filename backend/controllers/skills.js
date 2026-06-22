import Skill from '../models/Skill.js';

export async function createSkill(req, res, next) {
  try {
    const skill = await Skill.create({ ...req.body, owner: req.user._id });
    res.status(201).json({ skill });
  } catch (err) {
    next(err);
  }
}

export async function listSkills(req, res, next) {
  try {
    const skills = await Skill.find().populate('owner', 'name avatar');
    res.json({ skills });
  } catch (err) {
    next(err);
  }
}

export async function deleteSkill(req, res, next) {
  try {
    const skill = await Skill.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
    if (!skill) return res.status(404).json({ error: 'Skill not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
}
