import request from 'supertest';
import express from 'express';
import { jest, describe, test, expect, afterEach, beforeEach } from '@jest/globals';

// Defining mock data for users
const mockUsers = [
    {
        id: 1,
        name: "Alice Smith",
        email: "alice.smith@example.com",
        password: "hashed_password",
        role: "user",
        created_at: "2022-01-01T12:00:00Z",
        updated_at: "2023-01-01T12:00:00Z"
    },
    {
        id: 2,
        name: "Bob Johnson",
        email: "bob.johnson@example.com",
        password: "hashed_password",
        role: "admin",
        created_at: "2022-02-01T12:00:00Z",
        updated_at: "2023-02-01T12:00:00Z"
    },
];

const mockUser = mockUsers[0];

const newUser = {
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    password: "hashed_password",
    role: "user",
};

const createdUser = { id: 3, ...newUser };

const updatedUser = {
    name: "Alice Smith Updated",
    email: "alice.smith_updated@example.com",
    password: "hashed_password",
    role: "user",
};

const returnedUser = { id: 1, ...updatedUser };

const deletedUser = {
    id: 1,
    name: "User to Delete",
    email: "user.delete@example.com",
    role: "user",
};

// Create mock UserModel
const mockUserModel = {
    getAllUsers: jest.fn().mockResolvedValue(mockUsers),
    getUserById: jest.fn().mockResolvedValue(mockUser),
    getUserByEmail: jest.fn().mockResolvedValue(mockUser),
    createUser: jest.fn().mockResolvedValue(createdUser),
    updateUser: jest.fn().mockResolvedValue(returnedUser),
    deleteUser: jest.fn().mockResolvedValue(deletedUser),
};

// Mock the module before importing
jest.unstable_mockModule('../models/userModel.js', () => ({
    UserModel: mockUserModel,
}));

// Import after mocking
const userRoutes = (await import('../routes/userRoutes.js')).default;

const app = express();
app.use(express.json());
app.use('/users', userRoutes);

// Clear mocks and reset return values before each test
beforeEach(() => {
    jest.clearAllMocks();
    mockUserModel.getAllUsers.mockResolvedValue(mockUsers);
    mockUserModel.getUserById.mockResolvedValue(mockUser);
    mockUserModel.getUserByEmail.mockResolvedValue(mockUser);
    mockUserModel.createUser.mockResolvedValue(createdUser);
    mockUserModel.updateUser.mockResolvedValue(returnedUser);
    mockUserModel.deleteUser.mockResolvedValue(deletedUser);
});

describe('User Routes', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('GET /users - should return all users', async () => {
        const res = await request(app).get('/users');

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(mockUsers);
    });

    test('GET /users/:id - should return user by ID', async () => {
        const res = await request(app).get('/users/1');

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(mockUser);
    });

    test('GET /users/email/:email - should return user by email', async () => {
        const res = await request(app).get('/users/email/alice.smith@example.com');

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(mockUser);
    });

    test('POST /users - should create a new user', async () => {
        const res = await request(app).post('/users').send(newUser);

        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual(createdUser);
    });

    test('PUT /users/:id - should update an existing user', async () => {
        const res = await request(app).put('/users/1').send(updatedUser);

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(returnedUser);
    });

    test('DELETE /users/:id - should delete a user', async () => {
        const res = await request(app).delete('/users/1');

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(deletedUser);
    });
});
