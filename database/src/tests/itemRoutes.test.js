import request from 'supertest';
import express from 'express';
import { jest, describe, test, expect, afterEach, beforeEach } from '@jest/globals';

// Define mock data at the top level
const mockItems = [
    {
        id: 1,
        name: "Item A",
        quantity: 100,
        size: "Large",
        sku: "SKU001",
        color: "Red",
        updated_at: "2025-11-13T09:48:48.199Z",
    },
    {
        id: 2,
        name: "Item B",
        quantity: 200,
        size: "Medium",
        sku: "SKU002",
        color: "Blue",
        updated_at: "2025-11-13T09:48:48.199Z",
    },
];

const mockItem = mockItems[0];

const newItem = {
    name: "Item A",
    description: "Test item",
    quantity: 100,
    sku: "SKU001",
};

const createdItem = { id: 3, ...newItem };

const updatedItem = {
    name: "Item A Updated",
    description: "Updated test item",
    quantity: 105,
    sku: "SKU001",
};

const returnedItem = { id: 1, ...updatedItem };

const deletedItem = {
    id: 1,
    name: "Item to Delete",
    description: "Item to delete",
    quantity: 0,
    sku: "SKU5",
};

// Create mock ItemModel
const mockItemModel = {
    getAllItems: jest.fn().mockResolvedValue(mockItems),
    getItemById: jest.fn().mockResolvedValue(mockItem),
    createItem: jest.fn().mockResolvedValue(createdItem),
    updateItem: jest.fn().mockResolvedValue(returnedItem),
    deleteItem: jest.fn().mockResolvedValue(deletedItem),
};

// Mock the module before importing
jest.unstable_mockModule('../models/itemModel.js', () => ({
    ItemModel: mockItemModel,
}));

// Import after mocking
const { itemController } = await import('../controllers/itemController.js');
const itemRoutes = (await import('../routes/itemRoutes.js')).default;

const app = express();
app.use(express.json());
app.use('/items', itemRoutes);

beforeEach(() => {
  jest.clearAllMocks();
  mockItemModel.getAllItems.mockResolvedValue(mockItems);
  mockItemModel.getItemById.mockResolvedValue(mockItem);
  mockItemModel.createItem.mockResolvedValue(createdItem);
  mockItemModel.updateItem.mockResolvedValue(returnedItem);
  mockItemModel.deleteItem.mockResolvedValue(deletedItem);
});

describe('Item Routes', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('GET /items - should return all items', async () => {

        const res = await request(app).get('/items');

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(mockItems);
    });

    test('GET /items/:id - should return item by ID', async () => {
        const res = await request(app).get('/items/1');

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(mockItem);
    });


    test('POST /items - should create a new item', async () => {
        const res = await request(app).post('/items').send(newItem);

        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual(createdItem);
    });

    test('PUT /items/:id - should update an existing item', async () => {
        const res = await request(app).put('/items/1').send(updatedItem);

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(returnedItem);
    });

    test('DELETE /items/:id - should delete an item', async () => {
        const res = await request(app).delete('/items/1');

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(deletedItem);
    });

});