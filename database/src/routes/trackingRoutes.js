import express from 'express';
import { trackingController } from '../controllers/trackingController.js';
const router = express.Router();

// Get all trackings
router.get('/', trackingController.getAllTrackings);
// Get tracking by ID
router.get('/:id', trackingController.getTrackingById);
// Create new tracking
router.post('/', trackingController.createTracking);
// Update tracking
router.put('/:id', trackingController.updateTracking);
// Delete tracking
router.delete('/:id', trackingController.deleteTracking);

export default router;