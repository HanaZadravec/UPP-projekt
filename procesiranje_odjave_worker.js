import { Client, logger, Variables } from 'camunda-external-task-client-js';
const config = { baseUrl: 'http://localhost:8080/engine-rest', use: logger, asyncResponseTimeout: 10000 };
const client = new Client(config);
client.subscribe('pronadi-rezervaciju', async function({ task, taskService }) {
    const rezervacija = task.variables.get('rezervacija');

    const processVariables = new Variables();
    processVariables.set("rezervacija", rezervacija);

    console.log(`Uspješno pronađena rezervacija gosta!`)

    await taskService.complete(task, processVariables);
});

client.subscribe('stanjeSobe', async function({task, taskService}){

    const rezervacija_sobe = task.variables.get('rezervacija');
    console.log(`Promjenjeno stanje sobe ${rezervacija_sobe} u slobodno!` );

    await taskService.complete(task);
});
