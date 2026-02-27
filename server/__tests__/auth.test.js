const request = require("supertest");
const app = require("../app");
const User = require("../models/user");
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
  
describe("Auth endpoints", () => {
  test("GET /health returns success", async () => {
    const response = await request(app).get("/health");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("status", "success");
  });

  test("POST /user/register creates a user", async () => {
    const payload = {
      userName: "Jane Doe",
      email: "jane@example.com",
      password: "strong-password",
    };

    const response = await request(app).post("/user/register").send(payload);

    expect(response.status).toBe(201);
    const storedUser = await User.findOne({ email: payload.email });
    expect(storedUser).not.toBeNull();
    expect(storedUser.password).not.toBe(payload.password);
  });

  test("POST /user/register rejects duplicate email", async () => {
    const payload = {
      userName: "Jane Doe",
      email: "jane@example.com",
      password: "strong-password",
    };

    await request(app).post("/user/register").send(payload);
    const response = await request(app).post("/user/register").send(payload);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("message");
  });

  test("POST /user/login returns a token", async () => {
    const payload = {
      userName: "John Doe",
      email: "john@example.com",
      password: "another-strong-password",
    };

    await request(app).post("/user/register").send(payload);
    const response = await request(app)
      .post("/user/login")
      .send({ email: payload.email, password: payload.password });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  test("POST /user/login rejects invalid password", async () => {
    const payload = {
      userName: "John Doe",
      email: "john@example.com",
      password: "another-strong-password",
    };

    await request(app).post("/user/register").send(payload);
    const response = await request(app)
      .post("/user/login")
      .send({ email: payload.email, password: "wrong-password" });

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("message");
  });
});
