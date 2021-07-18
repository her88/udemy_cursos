require('dotenv').config()
const { leerInput, inquirerMenu, pausa, listarCiudades } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

// console.log(process.env.MAPBOX_KEY)

const main = async () => {

    const busquedas = new Busquedas();
    let opt;

    do {
        opt = await inquirerMenu();
        switch (opt) {
            case 1:
                // Mostar mensaje
                const lugar = await leerInput('Cuidad: ');

                 // Buscar los lugares
                const cuidades = await busquedas.buscarCuidades(lugar);              

                // Seleccionar el lugar
                const id = await listarCiudades(cuidades); 

                if (id === '0') continue;               

                const cuidadSelec = cuidades.find(c => c.id === id);
                
                const { nombre, lng, lat} = cuidadSelec;

                busquedas.guardarHistorial(nombre);

                // Clima
                const infoClima = await busquedas.climaPorLatLon(lat, lng);
                const {desc, temp, min, max} = infoClima;

                // MOstrar resultado
                console.clear();
                console.log('\nInformacion de la cuidad\n'.green);
                console.log('Cuidad:', nombre.yellow);
                console.log('Lat:', lat);
                console.log('Lng:', lng);
                console.log('Temperatura:', temp);
                console.log('Minima:', min);
                console.log('Maxima:', max);
                console.log('Descripcion del clima:', desc.yellow);

                break;
            case 2:
                busquedas.historialCapitalizada.forEach((c, i) => {
                    const idx = `${i + 1}.`.green;
                    console.log(`${idx} ${c}`);
                });
                break;
           
        }

        if (opt !== 0) await pausa();

    } while (opt !== 0);
}

main();