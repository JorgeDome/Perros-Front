//Array de todos los perros que se carga cuando se llama la API.
let perros = [];

//Es el id del perro a editar.
let perroEdit = null;

//Genera el html de cada perro de la lista de perros.
function añadirPerro(perro) {
  let content = 
    `<div class="col-md-3">
        <div class="card">
          <div class="card-header">
            Nombre: ${perro.nombre}
          </div>
          <img src= ${perro.image} class="card-img-top">
          <div class="card-body">
            Edad: ${perro.edad}
          </div>
          <div class="card-raza">
            Raza: ${perro.raza}
          </div>
          <div class="card-descripcion">
            Descripcion: ${perro.descripcion}
          </div>      
          <div>
            <button onclick="editPerro('${perro.id}')" class="btn btn-primary">Editar</button>
            <button onclick="borrarPerro('${perro.id}')" class="btn btn-primary">Borrar</button>  
          </div>
        </div>
      </div>`;
  list.innerHTML += content;
}

//Limpian los datos que hay en el modal, y resetea la variable perroEdit.
function cleanModal() {
  perroEdit = null;
  document.getElementById("nombre").value = "";
  document.getElementById("edad").value = "";
  document.getElementById("raza").value = "";
  document.getElementById("image").value = "";
  document.getElementById("descripcion").value = "";
}

//Cierra el modal.
function closeModal() {
  document.getElementById('new-entry').style.display = "none";
  cleanModal();
}

//Abre el modal y carga los datos a los input del perro que se eligio.
function editPerro(perroId) {
  let perro = perros.find(x => x.id == perroId);

  if (perro) {
    perroEdit = perro.id;
    document.getElementById("nombre").value = perro.nombre;
    document.getElementById("edad").value = perro.edad;
    document.getElementById("raza").value = perro.raza;
    document.getElementById("image").value = perro.image;
    document.getElementById("descripcion").value = perro.descripcion;

    //Abre el modal.
    document.getElementById('new-entry').style.display = "block";
  } else {
    Swal.fire({
      title: "Hubo un error",
      icon: "error"
    });
  }
}

//Muestra el modal.
function añadirMascota() {
  document.getElementById('new-entry').style.display = "block";
}

//Envia los datos de la mascota nueva o a editar a la API.
function sendPerro() {
    let perro = {
        id: perroEdit,
        nombre: document.getElementById("nombre").value,
        edad: document.getElementById("edad").value,
        raza: document.getElementById("raza").value,
        image: document.getElementById("image").value,
        descripcion: document.getElementById("descripcion").value
    }

    if (perroEdit) {
        axios.put('http://localhost:3000/api/perros', perro)
            .then(function () {
                Swal.fire({
                    title: "Perro modificado correctamente",
                    icon: "success",
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Ok',
                })
                .then((result) => {
                    cargarLista();
                    closeModal();
                })
            })
            .catch(function (error) {
                //Poner logica de error.
            });
    } else {
        axios.post('http://localhost:3000/api/perros', perro)
            .then(function (response) {
                Swal.fire({
                    title: "Perro guardado",
                    icon: "success",
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ir a inicio',
                    cancelButtonText: "Cargar otro perro"
                }).then((result) => {
                    cargarLista();
                    cleanModal();
                })
            })
            .catch(function (error) {
                Swal.fire({
                    title: "Hubo un error",
                    icon: "error"
                })
                if (error.response.status == 400) {
                    Swal.fire({
                        title: "Faltan datos",
                        icon: "warning",
                    })
                }
            });
    }
    perroEdit = null
}

//Borra los datos de la mascota.
function borrarPerro(perroId) {
    
    Swal.fire({
        title: "¿Está seguro que desea borrar este perro?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, borrar',
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            axios.delete('http://localhost:3000/api/perros/'+ perroId)
                .then(() => {
                    cargarLista();
                })
                .catch((error) => {
                    Swal.fire({
                        title: "Error al borrar el perro",
                        icon: "error"
                    })
                });
        }
    });
}

//Genera la lista de los perros que ya existen.
function cargarLista() {
    list.innerHTML = ""
    axios.get('http://localhost:3000/api/perros')
        .then(function (response) {
            perros = response.data;
            response.data.forEach(perro => {
                añadirPerro(perro);
            });
        })
}