require('dotenv').config();

const _ = require('lodash');

const { inquirerMenu, readInput, pause, placesList } = require('./helpers/inquirer');
const Searches = require('./models/searches');

const main = async () => {

    const searches = new Searches();

    let option;

    do {

        option = await inquirerMenu();

        switch (option) {
            case 1:

                //Request city
                const searchTerm = await readInput('Please, enter a city: ');

                //Search city in DB
                const places = await searches.city(searchTerm);


                //Select city
                const idSelect = await placesList(places);

                //Prevent error if no city is selected
                if (idSelect === '0') continue;

                //Get weather of city
                const placeSelect = places.find(place => place.id === idSelect);

                //Store city in DB
                searches.addCityToHistory(placeSelect.name);

                //Weather forecast
                const weather = await searches.weatherPlace(placeSelect.lat, placeSelect.long);
                //Show results
                console.clear();
                console.log('\n');
                console.log('INFO'.green);
                console.log('City: ', placeSelect.name.blue);
                console.log('Lat:', placeSelect.lat);
                console.log('Long:', placeSelect.long);
                console.log('Weather:', _.capitalize(weather.desc).blue);
                console.log('Temperature:', weather.temp);
                console.log('Min:', weather.min);
                console.log('Max:', weather.max);
                console.log('\n');
                break;

            case 2:

                //Show history
                searches.history.forEach((place) => {
                    console.log(place);
                });

                break;
        }


        if (option !== 0) await pause();

    } while (option !== 0)
}

main();