const fs = require('fs');
const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'americandream',
    password: 'adminpass',
    port: 5432,
});

async function loadElectionsData() {
    await client.connect();

    const data = fs.readFileSync('./elections.psv', 'utf8');
    const rows = data.split('\n').filter(row => row.trim() !== '');

    for (const row of rows) {
        const [electionId, electionTitle, societyId, startDate, endDate] = row.split('|');

        const query = `
            INSERT INTO americandreamdb."Election"(society_id, name, "startsAt", "endsAt")
            VALUES ($1, $2, $3, $4)
        `;
        const values = [societyId, electionTitle, startDate, endDate];

        await client.query(query, values);
    }

    await client.end();
}

loadElectionsData().catch(err => console.error(err));
