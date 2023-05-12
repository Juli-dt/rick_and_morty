const app = require("../app");

const session = require("supertest");

const request = session(app);

let char;
let favs = []
beforeAll(() => {
  char = {
    id: 1,
    status: "Alive",
    name: "Rick Sanchez",
    species: "Human",
    origin: "Earth (C-137)",
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    gender: "Male",
    location: "Citadel of Ricks",
  };
  favs.push(char)
  favs.push(char)
});

describe("Test Routes", () => {
  describe("Test GET character by ID (in params)", () => {
    it("Response status: 200 in route /character/:id", async () => {
      const res = await request.get("/rickandmorty/character/1"); // pause
      expect(res.statusCode).toBe(200);
    });
    it("Response character Rick /character/:id", async () => {
      const res = await request.get("/rickandmorty/character/1");
      expect(res.body).toEqual(char);
    });
    it("Response status: 404 in route /character/anyIdFalse", async () => {
      const res = await request.get("/rickandmorty/character/2323");
      expect(res.statusCode).toBe(404);
    });
  });

  describe("Test POST favorite by BODY", () => {});
  it("Response status: 200 in route rickandmorty/favorite id by body", async () => {
    const res = await request.post("/rickandmorty/favorite").send(char);
    expect(res.statusCode).toBe(200);
  });
  it("Response myFavorites Rick rickandmorty/favorite id by body", async () => {
    const res = await request.post("/rickandmorty/favorite").send(char);
    expect(res.body).toEqual(favs);
  });
  it("Response status: 404 in route rickandmorty/favorite id by body", async () => {
    const res = await request.post("/rickandmorty/favorite").send({});
    expect(res.statusCode).toBe(404);
  });
});

