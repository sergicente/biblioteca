//Variables

const biblioteca = document.querySelector('#biblioteca');
const botonNuevoLibro = document.querySelector('#anadirLibro');
const formulario = document.querySelector('#formulario');
const popup = document.querySelector('#popup');
const botonEnviar = document.querySelector('#botonEnviar');
const formularioTitulo = document.querySelector('#inputTitulo');
const formularioAutor = document.querySelector('#inputAutor');
const formularioPaginas = document.querySelector('#inputPaginas');
const formularioLeido = document.querySelector('#inputLeido');
const botonCerrar = document.querySelector('#botonCerrar');
const overlay = document.querySelector('#overlay');
let tituloNuevo = '';
let autorNuevo = '';
let paginasNuevo = '';
let leidoNuevo = false;


//eventos
overlay.addEventListener('click',()=>{
    popup.classList.toggle('activo');
    overlay.style.display = 'none';
    resetFormulario();
});
botonNuevoLibro.addEventListener('click',()=>{
    popup.classList.toggle('activo');
    botonNuevoLibro.classList.add('oculto');
    overlay.style.display = 'block';
});
botonCerrar.addEventListener('click',()=>{
    popup.classList.toggle('activo');
    overlay.style.display = 'none';
    resetFormulario();
});
formularioTitulo.addEventListener('input', (e) => {
    tituloNuevo = e.target.value;
    if (tituloNuevo === '') {
        formularioTitulo.classList.remove('inputCorrecto');
        formularioTitulo.classList.add('inputIncorrecto');
    } else {
        formularioTitulo.classList.remove('inputIncorrecto');
        formularioTitulo.classList.add('inputCorrecto');
    }
    if(tituloNuevo.trim() !== '' && autorNuevo.trim() !== '' && paginasNuevo.trim() !== ''){
        botonEnviar.classList.add('botonCorrecto');
    }else{
        botonEnviar.classList.remove('botonCorrecto');
    }
});

formularioAutor.addEventListener('input', (e)=>{
    autorNuevo = e.target.value;
    if (autorNuevo === '') {
        formularioAutor.classList.remove('inputCorrecto');
        formularioAutor.classList.add('inputIncorrecto');
    } else {
        formularioAutor.classList.remove('inputIncorrecto');
        formularioAutor.classList.add('inputCorrecto');
    }
    if(tituloNuevo.trim() !== '' && autorNuevo.trim() !== '' && paginasNuevo.trim() !== ''){
        botonEnviar.classList.add('botonCorrecto');
    }else{
        botonEnviar.classList.remove('botonCorrecto');
    }
});
formularioPaginas.addEventListener('input', (e)=>{
    paginasNuevo = e.target.value;
    if (paginasNuevo === '') {
        formularioPaginas.classList.remove('inputCorrecto');
        formularioPaginas.classList.add('inputIncorrecto');
    } else {
        formularioPaginas.classList.remove('inputIncorrecto');
        formularioPaginas.classList.add('inputCorrecto');
    }
    if(tituloNuevo.trim() !== '' && autorNuevo.trim() !== '' && paginasNuevo.trim() !== ''){
        botonEnviar.classList.add('botonCorrecto');
    }else{
        botonEnviar.classList.remove('botonCorrecto');
    }
});
formularioLeido.addEventListener('change', (e)=>{
    leidoNuevo = e.target.checked;
});
botonEnviar.addEventListener('click',(e)=>{
    e.preventDefault();
    if(tituloNuevo.trim() ==''){
        formularioTitulo.classList.add('inputIncorrecto');
    }
    if(autorNuevo.trim() ==''){
        formularioAutor.classList.add('inputIncorrecto');
    }
    if(paginasNuevo.trim() ==''){
        formularioPaginas.classList.add('inputIncorrecto');
    }
    if(tituloNuevo.trim() !== '' && autorNuevo.trim() !== '' && paginasNuevo.trim() !== ''){
        anadirLibro(tituloNuevo, autorNuevo, paginasNuevo, leidoNuevo);
        popup.classList.remove('activo');
        resetFormulario();
        overlay.style.display = 'none';
    }

});



let coleccion = [
    {
      titulo: "A Game of Thrones",
      autor: "George R. R. Martin",
      paginas: 694,
      leido: true
    },
    {
        titulo: "La Grieta del Silencio",
        autor: "Javier Castillo",
        paginas: 448,
        leido: false
    }
  ];


actualizarColeccion();





//Funciones

function resetFormulario(){
    formularioTitulo.classList.remove('inputCorrecto');
    formularioAutor.classList.remove('inputCorrecto');
    formularioPaginas.classList.remove('inputCorrecto');
    formularioTitulo.classList.remove('inputIncorrecto');
    formularioAutor.classList.remove('inputIncorrecto');
    formularioPaginas.classList.remove('inputIncorrecto');
    botonEnviar.classList.remove('botonCorrecto');
    botonEnviar.classList.remove('botonIncorrecto');
    botonNuevoLibro.classList.remove('oculto');
    tituloNuevo = '';
    autorNuevo = '';
    paginasNuevo = '';
    leidoNuevo = false;
    formulario.reset();
}


function Libro(titulo, autor, paginas, leido) {
    this.titulo = titulo;
    this.autor = autor;
    this.paginas = paginas;
    this.leido = leido;
}

function anadirLibro(titulo, autor, paginas, leido) {
    let nuevoLibro = new Libro(titulo, autor, paginas, leido);
    coleccion.push(nuevoLibro);
    actualizarColeccion();
}

function actualizarColeccion(){
    biblioteca.innerHTML = '';
    coleccion.forEach((libro, indice)=>{

        let libroNuevo = document.createElement('div');
        libroNuevo.classList.add('libro');
        biblioteca.appendChild(libroNuevo);

        let titulo = document.createElement('p');
        titulo.classList.add('titulo');
        titulo.textContent = libro.titulo;

        let autor = document.createElement('p');
        autor.classList.add('autor');
        autor.textContent = `by ${libro.autor}`;

        let paginas = document.createElement('p');
        paginas.classList.add('paginas');
        paginas.textContent = `${libro.paginas} pages`;

        let leido = document.createElement('button');
        leido.textContent = libro.leido ? 'read' : 'not read';
        leido.classList.add('botonLeido');
        if (libro.leido) {
            leido.classList.add('leido');
        }
        leido.dataset.indice = indice;
        leido.addEventListener('click', (e) => {
            coleccion[e.target.dataset.indice].leido = !coleccion[e.target.dataset.indice].leido;
            actualizarColeccion();
        });

        let quitar = document.createElement('button');
        quitar.classList.add('botonQuitar');
        quitar.textContent = 'remove';
        quitar.dataset.indice = indice;
    
        libroNuevo.appendChild(titulo);
        libroNuevo.appendChild(autor);
        libroNuevo.appendChild(paginas);
        libroNuevo.appendChild(leido);
        libroNuevo.appendChild(quitar);

    });
    const botonQuitar = document.querySelectorAll('.botonQuitar');
    botonQuitar.forEach((b)=>{
        b.addEventListener('click', (e)=>{
            const indice = e.target.dataset.indice;
            quitarLibro(indice);
        });
    });
}

function quitarLibro(indice){
    coleccion.splice(indice, 1);
    actualizarColeccion();
}