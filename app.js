require('dotenv').config();

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
                const placeSelect = places.find(place => place.id === idSelect);

                //Weather forecast
                const weather = await searches.weatherPlace(placeSelect.lat, placeSelect.long);
                //Show results
                console.clear();
                console.log('INFO'.green);
                console.log('City: ', placeSelect.name.blue);
                console.log('Lat:', placeSelect.lat);
                console.log('Long:', placeSelect.long);
                console.log('Weather:', weather.desc.blue);
                console.log('Temperature:', weather.temp);
                console.log('Min:', weather.min);
                console.log('Max:', weather.max);
                console.log('\n');
                break;
        }


        if (option !== 0) await pause();

    } while (option !== 0)
}

main();