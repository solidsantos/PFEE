import { Router } from 'express';

import {
  registerEvent,
  cancelRegistration
} from '../controllers/registrationController.js';

import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.post(
  '/events/:id/register',
  authMiddleware,
  registerEvent
);

router.delete(
  '/events/:id/register',
  authMiddleware,
  cancelRegistration
);

export default router;