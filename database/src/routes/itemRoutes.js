import express from 'express';
import { itemController } from '../controllers/itemController.js';
const router = express.Router();

// Get all items
router.get('/', itemController.getAllItems);
// Get item by ID
router.get('/:item_id', itemController.getItemById);
// Create new item
router.post('/', itemController.createItem);
// Update item
router.put('/:item_id', itemController.updateItem);
// Delete item
router.delete('/:item_id', itemController.deleteItem);

export default router;