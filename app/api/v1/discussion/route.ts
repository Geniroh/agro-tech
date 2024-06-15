// import Discussion from "../models/discussion.model.mjs";

// export const createDiscussion = async (req, res) => {
//   const { title, content, author } = req.body;
//   const discussion = new Discussion({ title, content, author });
//   try {
//     await discussion.save();
//     res.status(201).json(discussion);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// export const getDiscussions = async (req, res) => {
//   try {
//     const discussions = await Discussion.find().populate('author', 'username').populate('replies.author', 'username');
//     res.status(200).json(discussions);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// export const getDiscussionById = async (req, res) => {
//   try {
//     const discussion = await Discussion.findById(req.params.id).populate('author', 'username').populate('replies.author', 'username');
//     res.status(200).json(discussion);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// export const addReply = async (req, res) => {
//   const { content, author } = req.body;
//   try {
//     const discussion = await Discussion.findById(req.params.id);
//     if (!discussion) {
//       return res.status(404).json({ error: 'Discussion not found' });
//     }
//     discussion.replies.push({ content, author });
//     await discussion.save();
//     res.status(201).json(discussion);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };
