import request from 'supertest';
import express from 'express';
import { jest, describe, test, expect, afterEach, beforeEach } from '@jest/globals';

// Defining mock data at the top level to be used in across tests
const mockTracking = [
    {
        tracking_id: 1, 
        item_id: 101, 
        uuid: "123e4567-e89b-12d3-a456-426614174000", 
        last_seen: Date.now(),
        tracking_status: "Active",
    },
 
    {
        tracking_id: 2,
        item_id: 102,
        uuid: "123e4567-e89b-12d3-a456-426614174001",
        last_seen: Date.now(),
        tracking_status: "Inactive",
    },
];

const mockTrackingItem = mockTracking[0];

const newTracking = {
    item_id: 3,
    uuid: "123e12167-e89b-12d3-a456-426614174001",
    tracking_status: "Active",
};

const createdTracking = { tracking_id: 3, ...newTracking };

const updatedTracking = {
    item_id: 101,
    uuid: "123e12167-e89b-12d3-a456-426614174001",
    last_seen: Date.now(),
    tracking_status: "Active",
};

const returnedTracking = { tracking_id: 1, ...updatedTracking };

const deletedTracking = {
    tracking_id: 1,
    item_id: 101,
    uuid: "123e4567-e89b-12d3-a456-426614174000",
    last_seen: Date.now(),
    tracking_status: "Active",
};

// Create mock TrackingModel
const mockTrackingModel = {
    getAllTrackings: jest.fn().mockResolvedValue(mockTracking),
    getTrackingById: jest.fn().mockResolvedValue(mockTrackingItem),
    createTracking: jest.fn().mockResolvedValue(createdTracking),
    updateTracking: jest.fn().mockResolvedValue(returnedTracking),
    deleteTracking: jest.fn().mockResolvedValue(deletedTracking),
};

// Mock the module before importing
jest.unstable_mockModule('../models/trackingModel.js', () => ({
    TrackingModel: mockTrackingModel,
}));

// Import after mocking
const trackingRoutes = (await import('../routes/trackingRoutes.js')).default;

const app = express();
app.use(express.json());
app.use('/trackings', trackingRoutes);

//Clear mocks and reset return values before each test (so previous data doesn't affect new tests)
beforeEach(() => {
  jest.clearAllMocks();
  mockTrackingModel.getAllTrackings.mockResolvedValue(mockTracking);
  mockTrackingModel.getTrackingById.mockResolvedValue(mockTrackingItem);
  mockTrackingModel.createTracking.mockResolvedValue(createdTracking);
  mockTrackingModel.updateTracking.mockResolvedValue(returnedTracking);
  mockTrackingModel.deleteTracking.mockResolvedValue(deletedTracking);
});

describe('Tracking Routes', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('GET /trackings - should return all tracking', async () => {

        const res = await request(app).get('/trackings');

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(mockTracking);
    });

    test('GET /trackings/:id - should return tracking by ID', async () => {
        const res = await request(app).get('/trackings/1');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(mockTrackingItem);
    });


    test('POST /trackings - should create a new tracking', async () => {
        const res = await request(app).post('/trackings').send(createdTracking);

        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual(createdTracking);
    });

    test('PUT /trackings/:id - should update an existing tracking', async () => {
        const res = await request(app).put('/trackings/1').send(updatedTracking);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(returnedTracking);
    });

    test('DELETE /trackings/:id - should delete a tracking', async () => {
        const res = await request(app).delete('/trackings/1');

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(deletedTracking);
    });

});