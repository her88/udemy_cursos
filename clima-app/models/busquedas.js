const fs = require('fs');
const axios = require('axios');

class Busquedas {

    historial = [];
    dbPath = './db/database.json';

    constructor() {
        this.leerDb();
    }

    get paramsMapBox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'languaje': 'es'
        }
    }

    get paramsOpenWeather() {
        return {           
            appid: process.env.OPENWEATHER_KEY,
            units: 'metric',
            lang: 'es'
        }
    }

    get historialCapitalizada() {
        return this.historial.map(cuidad => {
            let palabras = cuidad.split(' ');
            palabras = palabras.map(p => p[0].toLocaleUpperCase() + p.substring(1));            
            return palabras.join(' ');
        })
    }

    async buscarCuidades(cuidad = '') {

        try {
            // peticion http
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${cuidad}.json`,
                params: this.paramsMapBox
            });

            const resp = await instance.get();

            return resp.data.features.map(f => ({
                id: f.id,
                text: f.text,
                nombre: f.place_name,
                lng: f.center[0],
                lat: f.center[1]
            }));
        } catch (error) {
            return [];
        }
    }

    async climaPorLatLon(lat, lon) {

        try {
            const instance = axios.create({
                baseURL:`https://api.openweathermap.org/data/2.5/weather`,
                params: { ...this.paramsOpenWeather, lat, lon }
            });

            const resp = await instance.get();
            const {main, weather} = resp.data;

            return {
                desc: weather[0].description,
                temp: main.temp,
                min: main.temp_min,
                max: main.temp_max
            }

        } catch (error) {
            console.log(error);
        }
    }

    guardarHistorial(cuidad = '') {

        if (this.historial.includes(cuidad.toLocaleLowerCase())) return;

        this.historial.unshift(cuidad.toLocaleLowerCase());

        this.guardarDb();
    }

    guardarDb() {

        const payload = {
            historial: this.historial
        }

        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    leerDb() {

        if (!fs.existsSync(this.dbPath)) return;

        const info = fs.readFileSync(this.dbPath, {encoding: 'utf-8'});
        const data = JSON.parse(info);
        this.historial = data.historial;
    }
}

module.exports = Busquedas;