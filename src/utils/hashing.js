import { hashSync, compareSync, genSaltSync } from 'bcrypt';

export const createHash = password => hashSync(password,genSaltSync(10));

export const isValidPassword = (user,password) => compareSync(password,user.password);

// //otra forma seria(Ambas formas son válidas y cumplen la misma función):
// export function hashear(frase) {
//     return hashSync(frase, genSaltSync(10));
// }

// export function hasheadasSonIguales(recibida, almacenada) {
//     return compareSync(recibida, almacenada);
// }