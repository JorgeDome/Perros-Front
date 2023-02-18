const loginForm = document.querySelector('#login form');
const loginSection = document.getElementById('login-section');
const dogsSection = document.getElementById('lista');

loginForm.addEventListener('submit', (event) => {
    event.preventDefault(); 

    const username = event.target.username.value;
    const password = event.target.password.value;

    if (username === 'Admin' && password === 'admin123') {
        loginSection.style.display = 'none';
        dogsSection.style.display = 'block';
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Los datos ingresados son incorrectos',
          })
          
    }
});

