const resetPassForm = document.querySelector('form')

resetPassForm?.addEventListener('submit', async event => {
  event.preventDefault()
  const response = await fetch('/api/usuarios', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    // @ts-ignore
    body: new URLSearchParams(new FormData(resetPassForm)) //codes and extract passform from html form
  })

  if (response.status === 200) {
    const sesion = await response.json()
    alert(JSON.stringify(sesion))
    window.location.href = '/login'
  } else {
    const error = await response.json()
    alert(error.message)
  }
})