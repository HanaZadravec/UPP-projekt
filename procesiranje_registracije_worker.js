import { Client, logger, Variables } from 'camunda-external-task-client-js';
const config = { baseUrl: 'http://localhost:8080/engine-rest', use: logger, asyncResponseTimeout: 10000 };
const client = new Client(config);
client.subscribe('registracija', async function({ task, taskService }) {
    const registracija = task.variables.get('registracija');

    console.log(`Uspjesno kreirana registracija pod brojem ${registracija}`);
    await taskService.complete(task);
});
