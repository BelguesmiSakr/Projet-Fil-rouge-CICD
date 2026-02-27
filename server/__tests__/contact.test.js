const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Contact = require("../models/contact");
const { setupTestDB, clearDatabase, teardownTestDB } = require("./testUtils");

afterAll(async () => {
  await teardownTestDB();
});

beforeAll(async () => {
  await setupTestDB();
});

beforeEach(async () => {
  await clearDatabase();
});

describe("Contact endpoints", () => {
  test("Contact CRUD flow", async () => {
    const userId = new mongoose.Types.ObjectId();
    const createPayload = {
      firstName: "Alice",
      lastName: "Smith",
      phoneNumber: "+21612345678",
      user_id: userId.toString(),
    };

    const createResponse = await request(app)
      .post("/contact/add")
      .send(createPayload);

    expect(createResponse.status).toBe(201);
    expect(createResponse.body).toHaveProperty("_id");
    expect(createResponse.body.firstName).toBe(createPayload.firstName);

    const contactId = createResponse.body._id;

    const listResponse = await request(app).get(`/contact/${userId}`);

    expect(listResponse.status).toBe(200);
    expect(Array.isArray(listResponse.body)).toBe(true);
    expect(listResponse.body).toHaveLength(1);

    const putPayload = {
      firstName: "Alice Updated",
      lastName: "Smith",
      phoneNumber: "+21699999999",
      user_id: userId.toString(),
    };

    const putResponse = await request(app)
      .put(`/contact/${contactId}`)
      .send(putPayload);

    expect(putResponse.status).toBe(200);
    expect(putResponse.body.firstName).toBe(putPayload.firstName);

    const patchPayload = { lastName: "Jones" };
    const patchResponse = await request(app)
      .patch(`/contact/${contactId}`)
      .send(patchPayload);

    expect(patchResponse.status).toBe(200);
    expect(patchResponse.body.lastName).toBe(patchPayload.lastName);

    const deleteResponse = await request(app).delete(`/contact/${contactId}`);

    expect(deleteResponse.status).toBe(200);

    const storedContact = await Contact.findById(contactId);
    expect(storedContact).toBeNull();
  });
});
