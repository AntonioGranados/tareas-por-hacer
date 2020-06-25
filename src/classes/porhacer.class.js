export class PorHacer {
    static fromJson({ id, tarea, completado, fechaCreacion }) {
        const tareaTemporal = new PorHacer(tarea);

        tareaTemporal.id = id;
        tareaTemporal.completado = completado;
        tareaTemporal.fechaCreacion = fechaCreacion;

        return tareaTemporal;

    }

    constructor(tarea) {
        this.tarea = tarea;

        this.id = new Date().getTime();
        this.completado = false;
        this.fechaCreacion = new Date();
    }
}