const axios = require('axios');

class Searches {

    history = ['Rosario', 'Funes', 'Mendoza', 'Córdoba', 'San Luis', 'Mar del Plata'];

    constructor() {
        //Read DB
    }
    async city(place = '') {

        try {
            //Petition to API
            //console.log('City ', place);
            const resp = await axios.get('https://reqres.in/api/users?page=2');//(`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${process.env.API_KEY}`);
            console.log(resp.data);
            //Return array of cities
            return [];
        } catch (error) {
            return [];
        }
    }
}

module.exports = Searches;