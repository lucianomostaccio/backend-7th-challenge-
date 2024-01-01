import { Router } from 'express'
import { onlyLoggedInWeb } from '../../middlewares/authorization.js'

export const webRouter = Router()

webRouter.get('/', (req, res) => {
  if (req.session['user']) {
    // If the user is logged in, redirect to /profile
    res.redirect('/profile');
  } else {
    // If the user is not logged in, redirect to /login
    res.redirect('/login');
  }
});

webRouter.get('/register', (req, res) => {
  // Only show the registration view if the user is not logged in
  if (!req.session['user']) {
    res.render('register.handlebars', { pageTitle: 'Register' });
  } else {
    // Redirect the user to the products view if already logged in
    res.redirect('/products');
  }
});

webRouter.get('/login', (req, res) => {
  // Only show the login view if the user is not logged in
  if (!req.session['user']) {
    res.render('login.handlebars', { pageTitle: 'Login' });
  } else {
    // Redirect the user to the products view if already logged in
    res.redirect('/products');
  }
});

webRouter.get('/profile', onlyLoggedInWeb, (req, res) => {
  res.render('profile.handlebars', {
    pageTitle: 'Profile',
    ...req.session['user']
  });
});

webRouter.get('/products', onlyLoggedInWeb, (req, res) => {
  // Load products directly, or change it to use a database
  const products = [
    { name: 'Product 1', price: 19.99 },
    { name: 'Product 2', price: 29.99 },
    { name: 'Product 3', price: 39.99 },
  ];
  console.log('User in session:', req.session['user']);
  res.render('products.handlebars', {
    welcomeMessage: 'Welcome',
    ...req.session['user'],
    pageTitle: 'Products',
    products,
  });
});

webRouter.get('/resetpass', (req, res) => {
  // Only show the reset password view if the user is not logged in
  if (!req.session['user']) {
    res.render('resetpass.handlebars', { pageTitle: 'Reset Password' });
  } else {
    // Redirect the user to the products view if already logged in
    res.redirect('/products');
  }
});


webRouter.get('/faillogin', (req, res) => {
  // Only show the fail login view if the user is not logged in
  if (!req.session['user']) {
    res.render('faillogin.handlebars', { pageTitle: 'Login failed' });
  } else {
    // Redirect the user to the products view if already logged in
    res.redirect('/products');
  }
});