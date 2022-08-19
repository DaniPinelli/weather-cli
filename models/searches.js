const fs = require('fs');
const axios = require('axios');

class Searches {

    history = [];
    dbPath = './db/searches.json';

    constructor() {
        //Read DB
        this.readDB();
    }

    get paramsMapbox() {
        return {
            'limit': '3',
            //'languaje': 'en',
            'access_token': process.env.MAPBOX_TOKEN
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
            // console.log(respMap.data.features);
            return respMap.data.features.map(place => ({
                //Return array of cities
                id: place.id,
                name: place.place_name,
                lat: place.center[1],
                long: place.center[0],

            }));

        } catch (error) {
            return [];
        }
    }

    get paramsOpen() {
        return {
            'appid': process.env.OPENWEATHERMAP_TOKEN,
            'units': 'metric'
        }
    }

    async weatherPlace(lat, lon) {

        try {

            //Instance Axios
            const instance2 = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { ...this.paramsOpen, lat, lon }
            });

            //Resp.data
            const respOpen = await instance2.get();
            const { weather, main } = respOpen.data;

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

    addCityToHistory(city = '') {

        //Add to history
        this.history.unshift(city);

        //Remove duplicates
        this.history = this.history.filter((item, index) => this.history.indexOf(item) === index);
        //Only keep the last 3 cities
        this.history = this.history.slice(0, 3);
        this.storeInDB();
    }

    //Save to DB
    storeInDB() {
        const payload = {
            history: this.history
        }
        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    //Read DB
    readDB() {

        if (fs.existsSync(this.dbPath)) {
            const payloadDB = JSON.parse(fs.readFileSync(this.dbPath));
            this.history = payloadDB.history;
        }
    }


}

module.exports = Searches;