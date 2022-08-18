require('dotenv').config();

const { inquirerMenu, readInput, pause } = require('./helpers/inquirer');
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
                await searches.city(place);

                //Search city in DB

                //Select city

                //Weather forecast

                //Show results
                console.log('\n');
                console.log('City Info'.green);
                console.log('City:');
                console.log('Lat:',);
                console.log('Long:',);
                console.log('Temperature:');
                console.log('Min:');
                console.log('Max:');
                break;
        }


        if (option !== 0) await pause();

    } while (option !== 0)
}

main();