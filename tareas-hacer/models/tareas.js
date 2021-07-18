const Tarea = require("./tarea");

class Tareas {
    _listado = {};

    get listado() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            listado.push(this._listado[key]);
        });

        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    cargarTareasFromArray(tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        })
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    mostrarTareas() {
        this.listado.forEach((t, i) => {
            const idx = `${i + 1}`.green;
            const estado = t.completadoEn ? 'Completada'.green : 'Pendiente'.red;
            console.log(`${idx} ${t.desc} :: ${estado}`);
        })
    }

    mostrarCompletadasPendientes(completadas = true) {
        this.listado.filter(tarea => completadas === !!tarea.completadoEn).forEach((t, i) => {
            const idx = `${i + 1}`.green;
            const estado = t.completadoEn ? 'Completada'.green : 'Pendiente'.red;
            console.log(`${idx} ${t.desc} :: ${estado}`);
        })
    }
}

module.exports = Tareas;