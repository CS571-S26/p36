import { Router, Response } from 'express';
import { authenticate, AuthRequest } from '../middleware/authenticate';
import { withChampionAssets } from '../utils/withChampionAssets';
import User from '../models/User';
import Comp from '../models/Comp';
import mongoose from 'mongoose';

const router = Router();

// GET /api/users/:username/mycomps - get comps created by user
router.get('/:username/mycomps', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username } as any);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const postIds = user?.createdPosts.map(p => p.postId);
    const comps = await Comp.find({ _id: { $in: postIds } } as any).sort({ createdAt: -1 });
    res.json(await withChampionAssets(comps));
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user posts.' });
  }
});

// GET /api/users/:username/bookmarks - get comps bookmarked by user
router.get('/:username/bookmarks', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username } as any);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const postIds = user?.bookmarkedPosts.map(p => p.postId);
    const comps = await Comp.find({ _id: { $in: postIds } } as any).sort({ createdAt: -1 });

    res.json(await withChampionAssets(comps));
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch bookmarks.' });
  }
});

// GET /api/users/:username/liked - get liked comps
router.get('/:username/liked', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username } as any);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const postIds = user?.likedPosts.map(p => p.postId);
    const comps = await Comp.find({ _id: { $in: postIds } } as any).sort({ createdAt: -1 });

    res.json(await withChampionAssets(comps));
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch liked posts.' });
  }
});

// DELETE /api/users/:username/mycomps/:compId - delete post
router.delete('/:username/mycomps/:compId', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const username = req.params.username as string;
    const compId = req.params.compId as string;

    const user = await User.findOne({ username } as any);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const comp = await Comp.findByIdAndDelete(compId);
    if (!comp) {
      return res.status(404).json({ message: 'Comp not found.' });
    }

    user!.createdPosts = user!.createdPosts.filter(p => p.postId.toString() !== compId);
    await user!.save();

    res.json({ message: 'Comp deleted.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete comp.' });
  }
});

// POST /api/users/:username/mycomps - create a comp
router.post('/:username/mycomps', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const username = req.params.username as string;
    const { title, champions, tips, howToTransition } = req.body;

    if (!title || !champions || champions.length === 0 || !tips) {
      return res.status(400).json({ message: 'title, champions, and tips are required.' });
    }

    const comp = new Comp({
      title,
      username,
      champions,
      tips,
      howToTransition: howToTransition ?? '',
    });

    await comp.save();

    const user = await User.findOne({ username } as any);
    if (user) {
      user.createdPosts.push({ postId: new mongoose.Types.ObjectId(comp._id.toString()) });
      await user.save();
    }

    res.status(201).json(comp);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create comp.' });
  }
});

// POST /api/users/:username/comps/:compId/bookmarks - toggle bookmark
router.post('/:username/comps/:compId/bookmarks', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const username = req.params.username as string;
    const compId = req.params.compId as string;

    const user = await User.findOne({ username } as any);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const alreadyBookmarked = user!.bookmarkedPosts.some(p => p.postId.toString() === compId);
    if (alreadyBookmarked) {
      // unbookmark: remove that comp from bookmarks
      user!.bookmarkedPosts = user!.bookmarkedPosts.filter(p => p.postId.toString() !== compId);
    } else {
      user!.bookmarkedPosts.push({ postId: new mongoose.Types.ObjectId(compId) });
    }

    await user!.save();
    res.json({ bookmarked: !alreadyBookmarked });
  } catch (err) {
    res.status(500).json({ message: 'Failed to toggle bookmark.' });
  }
});

// POST /api/users/:username/comps/:compId/liked/ - toggle like
router.post('/:username/comps/:compId/liked', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const username = req.params.username as string;
    const compId = req.params.compId as string;

    const user = await User.findOne({ username } as any);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const alreadyLiked = user!.likedPosts.some(p => p.postId.toString() === compId);
    if (alreadyLiked) {
      user!.likedPosts = user!.likedPosts.filter(p => p.postId.toString() !== compId);
      await Comp.findByIdAndUpdate(compId, { $inc: { heartCount: -1 } });
    } else {
      user!.likedPosts.push({ postId: new mongoose.Types.ObjectId(compId) });
      await Comp.findByIdAndUpdate(compId, { $inc: { heartCount: 1} });
    }

    await user!.save();
    res.json({ liked: !alreadyLiked });
  } catch (err) {
    res.status(500).json({ message: 'Failed to toggle like.' });
  }
});

// POST /api/users/:username/comps/:compId/comments - add a comment
router.post('/:username/comps/:compId/comments', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const compId = req.params.compId as string;
    const { content } = req.body;

    if (!content) return res.status(400).json({ message: 'content is required.' });

    const comp = await Comp.findByIdAndUpdate(
      compId,
      {
        $push: { comments: { username: req.user?.username, content } },
        $inc: { commentCount: 1 }
      },
      { returnDocument: 'after' }
    );

    if (!comp) return res.status(404).json({ message: 'Comp not found.' });

    res.status(201).json(comp.comments);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add comment.' });
  }
});

export default router;