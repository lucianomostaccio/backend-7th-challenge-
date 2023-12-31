import { hashSync, compareSync, genSaltSync } from "bcrypt";

export const createHash = (password) => hashSync(password, genSaltSync(10));

export const isValidPassword = (password, hashedPassword) =>
  compareSync(password, hashedPassword);

// //otra forma sería(Ambas formas son válidas y cumplen la misma función):
// export function createHash(frase) {
//     return hashSync(frase, genSaltSync(10));
// }

// export function isValidPassword(recibida, almacenada) {
//     return compareSync(recibida, almacenada);
// }
