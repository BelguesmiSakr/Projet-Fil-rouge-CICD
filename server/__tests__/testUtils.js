const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const connectDB = require("../config/db");

let mongoServer;

async function setupTestDB() {
  mongoServer = await MongoMemoryServer.create();
  process.env.MONGO_URI = mongoServer.getUri();
  process.env.JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "test-secret";
  await connectDB();
}

async function clearDatabase() {
  const collections = mongoose.connection.collections;
  const tasks = Object.keys(collections).map((key) =>
    collections[key].deleteMany({}),
  );
  await Promise.all(tasks);
}

async function teardownTestDB() {
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
  }
}

module.exports = {
  setupTestDB,
  clearDatabase,
  teardownTestDB,
};
