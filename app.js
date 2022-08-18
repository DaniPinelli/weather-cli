const { inquirerMenu, pause } = require('./helpers/inquirer');

const main = async () => {

    let option;

    do {
        option = await inquirerMenu();
        console.log({ option })



    } while (option !== 0) await pause();
}

main();