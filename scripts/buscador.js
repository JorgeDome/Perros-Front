document.addEventListener('keyup', e => {
    if (e.target.matches('#buscar')) {
        document.querySelectorAll('.col-md-3').forEach(perro => {
            perro.textContent.toLowerCase().includes(e.target.value) ?
                perro.classList.remove('filtro') :
                perro.classList.add('filtro')
        })
    }
})
