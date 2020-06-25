import { PorHacer } from "../classes";
import { listaPorHacer } from '../index';

// referencias en el html
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrarCompletados = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTareaHtml = (tareaPorHacer) => {
    const htmlPorHacer = `
    <li class="${(tareaPorHacer.completado) ? 'completed' : ''}" data-id="${tareaPorHacer.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${(tareaPorHacer.completado) ? 'checked' : ''}>
            <label>${tareaPorHacer.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement('div'); // creamos un div para agregar la lista de tareas
    div.innerHTML = htmlPorHacer; // agregamos la lista

    divTodoList.append(div.firstElementChild); // mostramos en el html el div cuyo primer hijo es la lista que acabamos de agregar

    return div.firstElementChild;
}

//Eventos
txtInput.addEventListener('keyup', (event) => {
    if (event.keyCode === 13 && txtInput.value.length > 0) {
        const nuevaTarea = new PorHacer(txtInput.value); // agregamos la tarea a la clase PorHacer enviadole como referencia el valor del input que el usuario escribio
        listaPorHacer.nuevaTareaPorHacer(nuevaTarea); // llamamos el metodo nuevaTareaPorHacer y le enviamos la tarea
        crearTareaHtml(nuevaTarea); // creamos la tarea en el html
        txtInput.value = ''; // limpiamos el input despúes de agregar la tarea
    }
});

divTodoList.addEventListener('click', (event) => {
    const nombreElemento = (event.target.localName); // elemento donde se hace click
    const elementoTarea = event.target.parentElement.parentElement; // hacemos referencia a la lista li 
    const tareaId = elementoTarea.getAttribute('data-id'); // obtenemos el id de la tarea que se encuentra en el atributo con clase data-id

    if (nombreElemento.includes('input')) { // si se hizo click en un input
        listaPorHacer.marcarTareaCompletada(tareaId); // marcamos a tarea completada
        elementoTarea.classList.toggle('completed'); // agregamos la clase completed 
    } else if (nombreElemento.includes('button')) { // si se hace click en el boton
        listaPorHacer.eliminarTareaPorHacer(tareaId); // eliminamos la tarea
        divTodoList.removeChild(elementoTarea); // eliminamos la tarea del html
    }
});

btnBorrarCompletados.addEventListener('click', () => {
    listaPorHacer.eliminarTareasCompletadas();
    for (let i = divTodoList.children.length - 1; i >= 0; i--) {
        const elemento = divTodoList.children[i];

        if (elemento.classList.contains('completed')) {
            divTodoList.removeChild(elemento);
        }
    }
});

ulFiltros.addEventListener('click', (event) => {
    const filtro = event.target.text; // seleccionamos el texto donde se hizo click, si se hace click en un espacio vacio regresa undefined

    if (!filtro) {
        return;
    }

    anchorFiltros.forEach(elem => elem.classList.remove('selected')); // barremos los elementos que tienen la clase filtro y le quitamos su clase
    event.target.classList.add('selected'); // agregamos la clase selected al elemento que seleccionemos

    for (const elemento of divTodoList.children) {
        elemento.classList.remove('hidden'); // quitamos la clase hidden a los elementos de la lista
        const tareaCompletada = elemento.classList.contains('completed'); // verificamos si la tarea tiene la clase completed

        switch (filtro) {
            case 'Pendientes':
                if (tareaCompletada) {
                    elemento.classList.add('hidden');
                }
                break;

            case 'Completados':
                if (!tareaCompletada) {
                    elemento.classList.add('hidden');
                }
                break;
        }
    }
});