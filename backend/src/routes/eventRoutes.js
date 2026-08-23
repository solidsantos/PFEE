import { Router } from 'express';

import {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
} from '../controllers/eventController.js';

import {
  getMyEvents
} from '../controllers/registrationController.js';

import { authMiddleware } from '../middlewares/authMiddleware.js';
import { adminMiddleware } from '../middlewares/adminMiddleware.js';

const router = Router();

router.get(
  '/',
  authMiddleware,
  getEvents
);

router.get(
  '/my',
  authMiddleware,
  getMyEvents
);

router.get(
  '/:id',
  authMiddleware,
  getEventById
);

router.post(
  '/',
  authMiddleware,
  adminMiddleware,
  createEvent
);

router.put(
  '/:id',
  authMiddleware,
  adminMiddleware,
  updateEvent
);

router.delete(
  '/:id',
  authMiddleware,
  adminMiddleware,
  deleteEvent
);

export default router;