//register
import { Router } from 'express'
import { usuariosManager } from '../../dao/models/Usuario.js'
import { createHash } from '../../utils/hashing.js'

export const usuariosRouter = Router()

usuariosRouter.post('/', async (req, res) => {
  try {
    //password hashing:
    req.body.password = createHash(req.body.password)

    const usuario = await usuariosManager.create(req.body)
    res.status(201).json({
      status: 'success',
      payload: usuario.toObject()
    })
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message })
  }
})