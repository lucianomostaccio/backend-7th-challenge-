//register
import { Router } from "express";
import { usersManager } from "../../dao/models/User.js";
import { createHash } from "../../utils/hashing.js";

export const usersRouter = Router();

usersRouter.post("/", async (req, res) => {
  try {
    //password hashing:
    req.body.password = createHash(req.body.password);

    const user = await usersManager.create(req.body);
    res.status(201).json({
      status: "success",
      payload: user.toObject(),
    });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
});

usersRouter.put("/", async function (req, res) {
  try {
    req.body.password = createHash(req.body.password);

    const actualizado = await usersManager.updateOne(
      { email: req.body.email },
      { $set: { password: req.body.password } },
      { new: true }
    );

    if (!actualizado) {
      return res
        .status(404)
        .json({ status: "error", message: "user not found" });
    }

    res.json({ status: "success", payload: actualizado }); //200 status code is by default, not needed to be specified
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
});
