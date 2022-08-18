const axios = require('axios');

class Searches {

    history = ['Rosario', 'Funes', 'Mendoza', 'Córdoba', 'San Luis', 'Mar del Plata'];

    constructor() {
        //Read DB
    }

    get paramsMapbox() {
        return {
            'limit': '4',
            'languaje': 'en',
            'access_token': process.env.MAPBOX_TOKEN
        }
    }

    get paramsOpen() {
        return {
            lat,
            lon,
            'appid': process.env.OPENWEATHERMAP_TOKEN,
            'units': 'metric'
        }
    }

    async city(place = '') {

        try {
            //Petition to API
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params: this.paramsMapbox
            });

            const respMap = await instance.get();
            //console.log(respMap);
            return respMap.data.features.map(place => ({
                id: place.id,
                name: place.place_name,
                lat: place.center[1],
                long: place.center[0],
                temp: place.recomendations.temperature,
                min: place.recomendations.min_temp,
                max: place.recomendations.max_temp


            }));
            //Return array of cities


        } catch (error) {
            return [];
        }
    }

    async weatherPlace(lat, lon) {

        try {

            //Instance axios
            const instance2 = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`, // ?lat=9.93333 & lon=-84.08333 & appid=9444671991127837d452f11b079214a2 & units=metric`,
                params: { ...this.paramsOpen, lat, lon }
            });

            //Resp.data
            const respMap = await instance.get();
            const { weather, main } = respMap.data;
            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }

        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = Searches;