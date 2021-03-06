
require('colors');
const fs = require('fs');
const { guardarDB, leerDB } = require('./helpers/archivo');
const { inquirerMenu, pausa, leerInput } = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');

const main = async () => {

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if (tareasDB) {
        // establecer las tareas
        tareas.cargarTareasFromArray(tareasDB);
    }


    do {
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                const desc = await leerInput('Descripcion:');
                tareas.crearTarea(desc);
                break;
            case '2':
                tareas.mostrarTareas();
                break;
            case '3':
                tareas.mostrarCompletadasPendientes();
                break;
            case '4':
                tareas.mostrarCompletadasPendientes(false);
                break;

        }

        guardarDB(tareas.listado);

        await pausa();

    } while (opt !== '0');

}


main();