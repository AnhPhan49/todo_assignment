const userModel = require("../../../src/models/user.model");
const { passwordCompare } = require("../../../src/services/user.service");

describe("note: passwordCompare", () => {
  it("check match password", async () => {
    const userId = "asd9a8sd098awd67d8aw"
    const user = "Anh Phan";
    const password = "1234567";
    const passwordHashed = "$2b$10$.z8BQbkr8TR8G7xAnmC5hObTg35RH0oG9LeYDrpTaEKwOS6XDOD7a"
    userModel.findOne = jest.fn().mockResolvedValue({
      _id: userId,
      user: user,
      password: passwordHashed,
      createdAt: "2021-12-03T16:38:58.158Z",
      updatedAt: "2021-12-03T16:38:58.158Z",
      __v: 0,
    });

    const newTask = await passwordCompare(user, password);
    expect(newTask).toStrictEqual(userId);
  });

  it("check unmatch password", async () => {
    try {
      const userId = "asd9a8sd098awd67d8aw";
      const user = "Anh Phan";
      const password = "1234567";
      const passwordHashed = "$2b$10$.z8BQbkr8TR8G7xAmC5ObTg35RH0oG9LeYDrpTaEKwOS6XDOD7a";
      // userModel.findOne = jest.fn().mockResolvedValue({
      //   _id: userId,
      //   user: user,
      //   password: passwordHashed,
      //   createdAt: "2021-12-03T16:38:58.158Z",
      //   updatedAt: "2021-12-03T16:38:58.158Z",
      //   __v: 0,
      // });
      await passwordCompare(user, password);

    } catch (err) {
      expect(err).toThrow(TypeError);
    }
  });
});