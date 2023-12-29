//login
import { Router } from "express";
import { usuariosManager } from "../../dao/models/Usuario.js";
// @ts-ignore
import { ADMIN_EMAIL, ADMIN_PASSWORD } from "../../config.js";
import { isValidPassword } from "../../utils/hashing.js";

export const sesionesRouter = Router();


sesionesRouter.post("/", async (req, res) => {
  const password = req.body;
  const usuario = await usuariosManager.findOne(req.body);
  if (!usuario) {
    return res.status(401).json({
      status: "error",
      message: "login failed",
    });
  }
  // if(password !== usuario.password){
  //   return res.status(401).json({
  //     status: "error",
  //     message: "login failed",
  //   });
  // }
  if(!isValidPassword(password, usuario.password)){
    return res.status(401).json({
      status: "error",
      message: "login failed",
    });
  }

  req.session["user"] = {
    nombre: usuario.nombre,
    apellido: usuario.apellido,
    email: usuario.email,
  };

  if (usuario.email === ADMIN_EMAIL && usuario.password === ADMIN_PASSWORD) {
    req.session["user"].rol = "admin";
  } else {
    req.session["user"].rol = "usuario";
  }

  // Redirección directa a la vista de productos
  res.status(201).json({
    status: "success",
    payload: req.session["user"],
  });
});

sesionesRouter.delete("/current", async (req, res) => {
  req.session.destroy((err) => {
    res
      .status(204)
      .json({ status: "success", message: "sesión cerrada correctamente" });
  });
});
