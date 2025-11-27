import { ItemModel } from '../models/itemModel.js';

// Controller for item operations
export const itemController = {
  async getAllItems(req, res, next) {
    try {
      const items = await ItemModel.getAllItems();
      res.json(items);
    } catch (error) {
      next(error);
    }
  },

  async getItemById(req, res, next) {
    try {
      const item = await ItemModel.getItemById(req.params.id);
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }
      res.json(item);
    } catch (error) {
      next(error);
    }
  },

  async createItem(req, res, next) {

    try {
      const { item_name, item_color, item_size, item_quantity, item_sku } = req.body;
      if (!item_name || !item_color || !item_size || !item_quantity || !item_sku) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      const newItem = await ItemModel.createItem({ item_name, item_color, item_size, item_quantity, item_sku });
      res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
  },

  async updateItem(req, res, next) {
    try {
      const { item_name, item_color, item_size, item_quantity, item_sku } = req.body;
      const updated = await ItemModel.updateItem(req.params.id, { item_name, item_color, item_size, item_quantity, item_sku });
      if (!updated) {
        return res.status(404).json({ error: 'Item not found' });
      }
      res.json(updated);
    } catch (error) {
      next(error);
    }
  },

  async deleteItem(req, res, next) {
    try {
      const deleted = await ItemModel.deleteItem(req.params.id);
      res.json(deleted);
    } catch (error) {
      next(error);
    }
  },
};
