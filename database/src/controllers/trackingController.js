import { TrackingModel } from '../models/trackingModel.js';

// Controller for tracking operations
export const trackingController = {
  async getAllTrackings(req, res, next) {
    try {
      const trackings = await TrackingModel.getAllTrackings();
      res.json(trackings);
    } catch (error) {
      next(error);
    }
  },

  async getTrackingById(req, res, next) {
    try {
      const tracking = await TrackingModel.getTrackingById(req.params.id);
      if (!tracking) {
        return res.status(404).json({ error: 'Tracking not found' });
      }
      res.json(tracking);
    } catch (error) {
      next(error);
    }
  },

  async createTracking(req, res, next) {
    try {
      const {tracking_id, item_id, tracking_status} = req.body;
      if (!tracking_id || !item_id || !tracking_status) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      const newTracking = await TrackingModel.createTracking({ tracking_id, item_id, tracking_status });
      res.status(201).json(newTracking);
    } catch (error) {
      next(error);
    }
  },

  async updateTracking(req, res, next) {
    try {
      const {tracking_id, item_id, tracking_status} = req.body;
      const updated = await TrackingModel.updateTracking(req.params.id, { tracking_id, item_id, tracking_status });
      if (!updated) {
        return res.status(404).json({ error: 'Tracking not found' });
      }
      res.json(updated);
    } catch (error) {
      next(error);
    }
  },

  async patchTracking(req, res, next) {
    const id = req.params.id;
    const fields = req.body;

    try {
      const patched = await TrackingModel.patchTracking(id, fields);
      res.json(patched);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to patch tracking' });
      next(error);
    }
  },

  async deleteTracking(req, res, next) {
    try {
      const deleted = await TrackingModel.deleteTracking(req.params.id);
      res.json(deleted);
    } catch (error) {
      next(error);
    }
  },
};
