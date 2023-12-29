import { Router } from 'express'
import { onlyLogueadosWeb } from '../../middlewares/autorizacion.js'

export const webRouter = Router()

webRouter.get('/', (req, res) => {
  if (req.session['user']) {
    // Si el usuario está logueado, redirige a /profile
    res.redirect('/profile');
  } else {
    // Si el usuario no está logueado, redirige a /login
    res.redirect('/login');
  }
});

webRouter.get('/register', (req, res) => {
  // Solo mostrar la vista de registro si el usuario no está logueado
  if (!req.session['user']) {
    res.render('register.handlebars', { pageTitle: 'Registro' });
  } else {
    // Redirigir al usuario a la vista de productos si ya está logueado
    res.redirect('/products');
  }
});


webRouter.get('/login', (req, res) => {
  // Solo mostrar la vista de login si el usuario no está logueado
  if (!req.session['user']) {
    res.render('login.handlebars', { pageTitle: 'Login' });
  } else {
    // Redirigir al usuario a la vista de productos si ya está logueado
    res.redirect('/products');
  }
});

webRouter.get('/profile', onlyLogueadosWeb, (req, res) => {
  res.render('profile.handlebars', {
    pageTitle: 'Perfil',
    ...req.session['user']
  });
});

webRouter.get('/products', onlyLogueadosWeb, (req, res) => {
  // cargar los productos directamente, o desde base de datos
  const products = [
    { name: 'Producto 1', price: 19.99 },
    { name: 'Producto 2', price: 29.99 },
    { name: 'Producto 3', price: 39.99 },
  ];
  console.log('Usuario en sesión:', req.session['user']);
  res.render('products.handlebars', {
    mensajeBienvenida: 'Bienvenido',
    ...req.session['user'],
    pageTitle: 'Productos',
    products,
  });
});
