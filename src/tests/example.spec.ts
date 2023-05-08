const axios = require("axios");

const api = process.env.REACT_APP_API_URL;

const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2ODM1NDY3MzEsImV4cCI6MTY4MzU1MzkzMSwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoibWQxQG1kMS5jb20ifQ.Opkw_0242fkMHNmNE8CK4LyVWomWqxgJNEFrTK3bZLvPU5k-BS18aMBbEFwpavDwclr1Wg8zqaIT0e-9b5TQYJVljYCRdAEw8oZFaPsoKONcyJXbkBCpTGGOYXMyG8HG3fJy5Wpe54fi2N3Xdyuv9uS5a67yUbjezya48OckmahXDbXT4twXOktKAmgKP_c446fAjLmTe-NNsESOg0kOZ2X164jrvu-Q_nWzzqXj3iiE2E3jU-_QA-VNkwlBNR6t0AwKTAKThFp6T84GuX-WRb4zwwUmi3nZGXPtHHXFYqElJEiGkLwXJjGyvV5u-VKcsEiS5juInG8Y7ptdTRZ2EQ";

const header = { Authorization: `Bearer ${token}` };

describe("API endpoint users", () => {
  it("should return status 200 and data", async () => {
    const response = await axios.get(`${api}/users`, header);
    expect(response.status).toEqual(200);
    expect(response.data).not.toBeNull();
  });
});

describe("API endpoint users groups", () => {
  const groupId = "63";
  it("should return status 200 and data", async () => {
    const response = await axios.get(
      `${api}/groups/${groupId}/members`,
      header
    );
    expect(response.status).toEqual(200);
    expect(response.data).not.toBeNull();
  });
});

describe("API endpoint users groups", () => {
  const userBody = {
    email: "test178@example.com",
    plainPassword: "string",
    nickname: "string",
  };
  it("should return status 201 and data", async () => {
    const response = await axios.post(`${api}/users`, userBody);
    expect(response.status).toEqual(201);
    expect(response.data).not.toBeNull();
  });
});

describe("API endpoint user", () => {
  it("should return status 200 and data", async () => {
    const response = await axios.get(`${api}/groups`, header);
    expect(response.status).toEqual(200);
    expect(response.data).not.toBeNull();
  });
});

describe("API endpoint user", () => {
  const groupBody = {
    name: "newGroup",
    description: "desc",
  };
  it("should return status 201 and data", async () => {
    const response = await axios.post(`${api}/groups`, groupBody, header);
    expect(response.status).toEqual(201);
    expect(response.data).not.toBeNull();
  });
});

describe("API endpoint user", () => {
  const userId = "99";
  it("should return status 200 and data", async () => {
    const response = await axios.get(`${api}/users/${userId}`, header);
    expect(response.status).toEqual(200);
    expect(response.data).not.toBeNull();
  });
});

describe("API endpoint groups", () => {
  const groupId = "64";
  it("should return status 200 and data", async () => {
    const response = await axios.get(`${api}/groups/${groupId}`, header);
    expect(response.status).toEqual(200);
    expect(response.data).not.toBeNull();
  });
});

describe("API endpoint groups", () => {
  const groupId = "64"
  it("should return status 204 and data", async () => {
    const response = await axios.delete(`${api}/groups/${groupId}`, header);
    expect(response.status).toEqual(204);
    expect(response.data).not.toBeNull();
  });
});

describe("API endpoint groups", () => {
  const groupId = "64";
  const groupBody = {
    name: "NewName",
    description: "test",
  };
  it("should return status 203 and data", async () => {
    const response = await axios.patch(`${api}/groups/${groupId}`, groupBody, header);
    expect(response.status).toEqual(203);
    expect(response.data).not.toBeNull();
  });
});

describe("API endpoint user", () => {
  const userId = "99"
  it("should return status 204 and data", async () => {
    const response = await axios.delete(`${api}/users/${userId}`, header);
    expect(response.status).toEqual(204);
    expect(response.data).not.toBeNull();
  });
});

describe("API endpoint user infos", () => {
  const userId = 99
  console.log(`${api}/users/${userId}/info`)
  it("should return status 200 and data", async () => {
    const response = await axios.get(`${api}/users/${userId}/info`, header);
    console.log(response)
    expect(response.status).toEqual(200);
    expect(response.data).not.toBeNull();
  });
});

//etc..