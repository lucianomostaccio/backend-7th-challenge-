import { Router } from 'express';
import { createHash } from '../../utils/hashing';

export const bcryptRouter = Router();

bcryptRouter.post('/register', async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;
    if (!first_name || !last_name || !email || !age) return res.status(400).send({ status: 'error', message: 'Faltan datos' });
    let user = {
        first_name,
        last_name,
        email,
        age: age,
        password: createHash(password)
    }
});