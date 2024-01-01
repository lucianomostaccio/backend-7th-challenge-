//login
import { Router } from "express";
import { ADMIN_EMAIL, ADMIN_PASSWORD } from "../../config/config.js";
import passport from "passport";
// import { usersManager } from "../../dao/models/User.js";
// import { isValidPassword } from "../../utils/hashing.js";

export const sessionsRouter = Router();

// MANUAL AUTHENTICATION:
// sessionsRouter.post("/", async (req, res) => {
//   const password = req.body.password;
//   const user = await usersManager.findOne({ email: req.body.email });

//   //console.log(user, password) for debugging only

//   if (!user) {
//     return res.status(401).json({
//       status: "error",
//       message: "login failed",
//     });
//   }
//   if (!isValidPassword(password, user.password)) {
//     return res.status(401).json({
//       status: "error",
//       message: "login failed",
//     });
//   }

//   req.session["user"] = {
//     first_name: user.first_name,
//     last_name: user.last_name,
//     email: user.email,
//     age: user.age,
//   };

//   if (user.email === ADMIN_EMAIL && user.password === ADMIN_PASSWORD) {
//     req.session["user"].rol = "admin";
//   } else {
//     req.session["user"].rol = "user";
//   }

//   // Redirección directa a la vista de productos
//   res.status(201).json({
//     status: "success",
//     payload: req.session["user"],
//   });
// });

sessionsRouter.post("/", passport.authenticate('login',{failureRedirect:'/faillogin'}), async (req, res) => {
  if(!req.user) return res.status(400).json({status:"error", message:"invalid credentials"});
  // @ts-ignore
  req.session["user"]= {
    // @ts-ignore
    first_name: req.user.first_name,
    // @ts-ignore
    last_name: req.user.last_name,
    // @ts-ignore
    email: req.user.email,
    // @ts-ignore
    age: req.user.age,
    // @ts-ignore
    role: req.user.email === ADMIN_EMAIL && req.user.password === ADMIN_PASSWORD ? "admin" : "user"
  };

  res.status(201).json({
    status: "success",
    payload: req.session["user"],
  });
})

// @ts-ignore
// sessionsRouter.get("/faillogin", (req, res) => {
//   res.send({error:"login failed"})
// });

sessionsRouter.delete("/current", async (req, res) => {
  // @ts-ignore
  req.session.destroy((err) => {
    res
      .status(204)
      .json({ status: "success", message: "session closed sucessfully" });
  });
});