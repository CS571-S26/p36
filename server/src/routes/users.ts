import { Router } from 'express';
import { authenticate } from '../middleware/authenticate';
import {
  getMyComps,
  getBookmarks,
  getLiked,
  deleteComp,
  createComp,
  toggleBookmark,
  toggleLike,
  addComment,
} from '../controllers/users';

const router = Router();

router.get('/:username/mycomps', authenticate, getMyComps);
router.get('/:username/bookmarks', authenticate, getBookmarks);
router.get('/:username/liked', authenticate, getLiked);
router.delete('/:username/mycomps/:compId', authenticate, deleteComp);
router.post('/:username/mycomps', authenticate, createComp);
router.post('/:username/comps/:compId/bookmarks', authenticate, toggleBookmark);
router.post('/:username/comps/:compId/liked', authenticate, toggleLike);
router.post('/:username/comps/:compId/comments', authenticate, addComment);

export default router;