require('dotenv').config();

const { inquirerMenu, readInput, pause, listToDelete } = require('./helpers/inquirer');
const Searches = require('./models/searches');

const main = async () => {

    const searches = new Searches();

    let option;

    do {

        option = await inquirerMenu();

        switch (option) {
            case 1:
                //Request city
                const place = await readInput('Please, enter a city: ');

                //Search city in DB
                const places = await searches.city(place);

                //Select city
                const idSelect = await listToDelete(places);
                const placeSelect = places.find(place => place.id === idSelect);

                //Weather forecast
                const weather = await searches.weatherPlace(placeSelect.lat, placeSelect.long);

                //Show results
                console.log('\n');
                console.log('City Info'.green);
                console.log('City: ', placeSelect.name);
                console.log('Lat:', placeSelect.lat);
                console.log('Long:', placeSelect.long);
                console.log('Temperature:', weather.temp);
                console.log('Min:', weather.min);
                console.log('Max:', weather.max);
                break;
        }


        if (option !== 0) await pause();

    } while (option !== 0)
}

main();