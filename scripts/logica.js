    function añadirPerro(perro) {
        let content =
            `<div class="col-md-3">
   <div class="card" >

    <div class="card-header">
        Nombre: ${perro.nombre}
    </div>

    <img src=${perro.image} class="card-img-top">
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
</div>`

        list.innerHTML += content;
        
        
    }




    let perros  = [];
    let perroEdit = null;


    function cleanModal(){
       perroEdit= null;
                document.getElementById("nombre").value = "",  
                document.getElementById("edad").value = "", 
                document.getElementById("raza").value = "" ,
                document.getElementById("image").value = "", 
                document.getElementById("descripcion").value = ""
            
    }
    function closeModal(){
        document.getElementById('new-entry').style.display = "none";
        cleanModal();
    }
    
        function editPerro(perroId){
            let perro = perros.find(x => x.id == perroId) 
            console.log(perro)
            
            if (perro) {
                
                perroEdit = perro.id;
                document.getElementById("nombre").value = perro.nombre;
                document.getElementById("edad").value = perro.edad;
                document.getElementById("raza").value = perro.raza;
                document.getElementById("image").value = perro.image;
                document.getElementById("descripcion").value = perro.descripcion;
                

                document.getElementById('new-entry').style.display = "block"
                
                
            }
            else{
                
                Swal.fire({
                    title: "Hubo un error",
                    icon: "error"
                })
                
            }
            
        }

        //Esta funcion sirve para sumar una mascota a la pagina.
        function  añadirMascota(){
            document.getElementById('new-entry').style.display = "block"
           
        }
         
        //Esta funcion manda los datos de la mascota.
        function sendPerro() {
            let editPerro = 
            { 
                id: perroEdit,
                nombre: document.getElementById("nombre").value,
                edad: document.getElementById("edad").value,
                raza: document.getElementById("raza").value,
                image: document.getElementById("image").value,
                descripcion: document.getElementById("descripcion").value
            }
            



            if(perroEdit){
               
                axios.put('/edit-entry', editPerro)
        
          .then(function (response) {
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
            console.log(error);
          });
          
            }else {
                
            
            axios.post("/new-entry", editPerro)
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
                    console.log(error);
                    if (error.response.status == 400) {
                        Swal.fire({
                            title: "Faltan datos",
                            icon: "warning"
                        })
                    }
                });
        } 
        perroEdit = null
    }

       
      
    //Esta funcion borra los datos de la mascota.

    function borrarPerro(perroId) {
        axios.delete('/delete/' + perroId)
        cargarLista();
    }
    //Esta funcion carga datos nuevos.
    function cargarLista() {
        list.innerHTML = ""
        axios.get('/perros')
            .then(function (response) {
                perros = response.data;
                response.data.forEach(perro => {
                    añadirPerro(perro);
                });
            })
    }
    //Esta funcion edita datos
    function editarPerro(perro) {
        console.log(perro)
        axios.put('/edit-entry', {perro})
        
          .then(function (response) {
          })
          .catch(function (error) {
            console.log(error);
          });
      }