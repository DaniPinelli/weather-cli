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

    async city(place = '') {

        try {
            //Petition to API
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params: this.paramsMapbox
            });

            const resp = await instance.get();

            //Return array of cities
            console.log(resp.data);
            return [];
        } catch (error) {
            return [];
        }
    }
}

module.exports = Searches;