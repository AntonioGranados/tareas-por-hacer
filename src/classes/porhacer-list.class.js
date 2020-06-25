import { PorHacer } from "./porhacer.class";

export class PorHacerList {
    constructor() {
        //this.tareasPorHacer = []; // arreglo donde se almacenaran las tareas por hacer
        this.cargarTareasDelLocalStorage();
    }

    nuevaTareaPorHacer(tareaPorHacer) {
        this.tareasPorHacer.push(tareaPorHacer); // agregamos al arreglo las tareas que recibimos como argumento
        this.guardarTareaEnLocalStorage();
    }

    eliminarTareaPorHacer(id) {
        this.tareasPorHacer = this.tareasPorHacer.filter(tarea => tarea.id != id);
        this.guardarTareaEnLocalStorage();
    }

    marcarTareaCompletada(id) {
        for (const tarea of this.tareasPorHacer) { // recorremos el arreglo de tareasPorHacer
            if (tarea.id == id) { // si el id de la tarea es igual al id que recibo como referencia
                tarea.completado = !tarea.completado; // la tarea sera igual a la negacion de la misma, es decir si la tarea es true, entonces sera igual a false y viceversa 
                this.guardarTareaEnLocalStorage();
                break; // detenemos el ciclo
            }
        }
    }

    eliminarTareasCompletadas() {
        this.tareasPorHacer = this.tareasPorHacer.filter(tarea => !tarea.completado);
        this.guardarTareaEnLocalStorage();
    }

    guardarTareaEnLocalStorage() {
        localStorage.setItem('tarea', JSON.stringify(this.tareasPorHacer));
    }

    cargarTareasDelLocalStorage() {
        this.tareasPorHacer = (localStorage.getItem('tarea') ? JSON.parse(localStorage.getItem('tarea')) : []);
        this.tareasPorHacer = this.tareasPorHacer.map(PorHacer.fromJson);
    }
}