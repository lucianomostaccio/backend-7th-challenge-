const formLogout = document.querySelector('form')

formLogout?.addEventListener('submit', async event => {
  event.preventDefault()
  alert('sesión cerrada correctamente');
  try {
    const response = await fetch('/api/sesiones/current', {
      method: 'DELETE'
    });

    if (response.status === 204){
      // La sesión se cerró correctamente, redirige a la página de login
      window.location.href = '/login';
    } else {
      // otros casos, si es necesario
      const error = await response.json();
      alert(error.message);
    }
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
});