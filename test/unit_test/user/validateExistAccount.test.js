const userModel = require("../../../src/models/user.model");
const { validateExistAccount } = require("../../../src/services/user.service");

describe("note: addTask", () => {
  it("check exist user with exist userID", async () => {
    const user = "Anh Phan";
    const password = "ad4w646d8aw48was3232135aw484";
    userModel.findOne = jest.fn().mockResolvedValue({
      user: user,
      password: password,
      createdAt: "2021-12-03T16:38:58.158Z",
      updatedAt: "2021-12-03T16:38:58.158Z",
      __v: 0,
    });

    const newTask = await validateExistAccount(user);
    expect(newTask).toStrictEqual(true);
  });

  it("check exist user with exist userID", async () => {
    const user = "Anh Phan 3";
    const password = "ad4w646d8aw48was3232135aw484";
    userModel.findOne = jest.fn().mockResolvedValue({
      user: user,
      password: password,
      createdAt: "2021-12-03T16:38:58.158Z",
      updatedAt: "2021-12-03T16:38:58.158Z",
      __v: 0,
    });

    const newTask = await validateExistAccount(user);
    expect(newTask).toStrictEqual(true);
  });
});
