import Proposal from '../models/Proposal.js';

export async function createProposal(req, res, next) {
  try {
    const proposal = await Proposal.create({ ...req.body, from: req.user._id });
    res.status(201).json({ proposal });
  } catch (err) {
    next(err);
  }
}

export async function getProposals(req, res, next) {
  try {
    const proposals = await Proposal.find({
      $or: [{ from: req.user._id }, { to: req.user._id }],
    }).populate('from to match').sort({ createdAt: -1 });
    res.json({ proposals });
  } catch (err) {
    next(err);
  }
}

export async function updateProposalStatus(req, res, next) {
  try {
    const proposal = await Proposal.findById(req.params.id);
    if (!proposal) return res.status(404).json({ error: 'Proposal not found' });
    if (proposal.to.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    proposal.status = req.body.status;
    await proposal.save();
    res.json({ proposal });
  } catch (err) {
    next(err);
  }
}
