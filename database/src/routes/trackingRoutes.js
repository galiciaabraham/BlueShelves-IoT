import express from 'express';
import { trackingController } from '../controllers/trackingController.js';
const router = express.Router();

// Get all trackings
router.get('/', trackingController.getAllTrackings);
// Get tracking by ID
router.get('/:tracking_id', trackingController.getTrackingById);
// Create new tracking
router.post('/', trackingController.createTracking);
// Update tracking
router.put('/:id', trackingController.updateTracking);
//Patch tracking
router.put('/patch/:id', trackingController.patchTracking); 
//Bulk update trackings
router.post('/bulk', trackingController.bulkUpdateTrackings);
// Delete tracking
router.delete('/:id', trackingController.deleteTracking);

export default router;