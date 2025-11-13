import { UserModel } from '../models/userModel.js';

export const userController = {
  async getAllUsers(req, res, next) {
    try {
      const users = await UserModel.getAllUsers();
      res.json(users);
    } catch (error) {
      next(error);
    }
  },

  async getUserById(req, res, next) {
    try {
      const user = await UserModel.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      next(error);
    }
  },

  async createUser(req, res, next) {
    try {
      const { name, email, password, role } = req.body;
      if (!name || !email || !password || !role) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      const newUser = await UserModel.createUser({ name, email, password, role });
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  },

  async updateUser(req, res, next) {
    try {
      const { name, email, password, role } = req.body;
      const updated = await UserModel.updateUser(req.params.id, { name, email, password, role });
      if (!updated) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(updated);
    } catch (error) {
      next(error);
    }
  },

  async deleteUser(req, res, next) {
    try {
      const deleted = await UserModel.deleteUser(req.params.id);
      res.json(deleted);
    } catch (error) {
      next(error);
    }
  },
};
