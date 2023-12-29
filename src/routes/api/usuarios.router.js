//register
import { Router } from "express";
import { usuariosManager } from "../../dao/models/Usuario.js";
import { createHash } from "../../utils/hashing.js";

export const usuariosRouter = Router();

usuariosRouter.post("/", async (req, res) => {
  try {
    //password hashing:
    req.body.password = createHash(req.body.password);

    const usuario = await usuariosManager.create(req.body);
    res.status(201).json({
      status: "success",
      payload: usuario.toObject(),
    });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
});

usuariosRouter.put("/", async function (req, res) {
  try {
    req.body.password = createHash(req.body.password);

    const actualizado = await usuariosManager.updateOne(
      { email: req.body.email },
      { $set: { password: req.body.password } },
      { new: true }
    );

    if (!actualizado) {
      return res
        .status(404)
        .json({ status: "error", message: "usuario no encontrado" });
    }

    res.json({ status: "success", payload: actualizado }); //200 status code is by default, not needed to be specified
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
});
