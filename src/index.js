import './style.css';

import { PorHacerList, PorHacer } from './classes';
import { crearTareaHtml } from './js/componentes';


export const listaPorHacer = new PorHacerList();

listaPorHacer.tareasPorHacer.forEach(tarea => crearTareaHtml(tarea));
console.log(listaPorHacer);