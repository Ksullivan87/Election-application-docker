const { Client } = require('pg');
const fs = require('fs'); //file system module 

let CLIENT;

function newConnection(uname, hname, db, pwd,){ //given the proper string paramaters, creates connection to db
     CLIENT = new Client({
        user: uname, //adminuser
        host: hname, //localhost
        database: db, //americandream[db]
        password: pwd, //adminpass
        port: 5432
    });
    CLIENT.connect();
}


    


async function getUserData(uname, pwd) { 
    const res = await CLIENT.query('SELECT * FROM get_user_login($1, $2)', [uname, pwd]);
	if(res.rows[0].name === uname) {
		return true;
	}
	else {
		return false;
	}
}

async function addUser(uname, role, fname, lname, phone) { 
    const res = await CLIENT.query(`insert into americandreamdb."User" (first_name, last_name, username, phone, role) values ('${fname}', '${lname}', '${uname}', '${phone}', '${role}');`);
	return res;
}

async function addSociety(name) { 
    const res = await CLIENT.query(`insert into americandreamdb."Society" (name) values ('${name}');`);
	return res;
}

async function addBallot(name, society_name, startDate) { 
	const societyID = CLIENT.query(`select society_id from americandreamdb."Society" where name = '${society_name}';`)
    const res = await CLIENT.query(`insert into americandreamdb."Election" (society_id, name, totalVotes, ballotCount, "startsAt") values ('${societyID}', '${name}', 0, 0, '${startDate}');`);
	return res;
}

async function getElectionID(electionName) {
    return await CLIENT.query(`select election_id from americandreamdb."Election" where name = '${electionName}';`);
}

async function addOffice() {
    
}

async function addCandidate(name, desc, officeName) {
	const officeID = CLIENT.query(`select office_id from americandreamdb."Office" where officeName = '${officeName}';`)
	const res = await CLIENT.query(`insert into americandreamdb."Candidate" (candidateName, description, office_id) values ('${name}', '${desc}', ${officeID});`);
	return res;
}

async function addInitiative(name, desc, election_id) {
	const res = await CLIENT.query(`insert into americandreamdb."Initiative" (election_id, initName, description) values (${election_id}, '${name}', '${desc}');`);
	return res;
}

function insertSessionID(sessionID, role, timestamp) {
	CLIENT.query(`INSERT INTO americandreamdb.sessionids VALUES ('${sessionID}', '${role}', '${timestamp}');`);
}

//gets PreviousElection data
async function getPreviousElections(){
    const res = await CLIENT.query(`SELECT "Election".name AS name, "Society".name AS soc_name , "Election".election_id 
                                    FROM americandreamdb."Election" 
                                    JOIN americandreamdb."Society"
                                    USING(society_id)
                                    WHERE "Election"."endsAt" < NOW()`);
    return res;
}

//gets ongoingElections, will be used for AD employees and admins
async function getOngoingElections(){
    const res = await CLIENT.query(`SELECT name, "endsAt", "totalVotes", election_id FROM americandreamdb."Election" WHERE "endsAt" > NOW()`);
    return res;
}

//gets Societies based on user assignment
async function getSocieties() {
    const res = await CLIENT.query(`SELECT "Society".name FROM americandreamdb."Society" JOIN americandreamdb."Assiggnment" USING society_id`); // needs to find current user id as well
    return res;
}

async function getProfile(user_id) {
    const res = await CLIENT.query(`SELECT first_name, last_name, username, role,"Society".name FROM americandreamdb."User" JOIN americandreamdb."Assignment" USING user_id JOIN americandreamdb."Society" USING society_id WHERE user_id LIKE ${user_id} `);
    return res;
}

//gets Election data, have to pass in election ID 
async function getElection(election_id){
    const res = await CLIENT.query(`SELECT "Election".election_id, "Election".name, "Election"."totalVotes", "Election"."ballotCount, "Election"."startsAt", "Election"."endsAt", "Society".name FROM americandreamdb."Election" WHERE election_id LIKE ${election_id} JOIN amercandreamdb."Society" USING(society_id)` );
    return res;
}

async function addOffice(name, elecName) {
    const elecID = await getElectionID(elecName);
    await CLIENT.query(`insert into americandreamdb."Office" ("officeName", election_id) values ('${name}', ${elecID});`);
}

// ---------------------------------------------------------------- Luke Functions

// Gets current active election for logged in member
async function getActiveElection(user_id) {
    const societyID = await CLIENT.query(`SELECT society_id FROM americandreamdb."Assignment" WHERE user_id = $1`, [user_id]);
    const currentDate = new Date();
    const election = await CLIENT.query(`
        SELECT * FROM americandreamdb."Election" 
        WHERE society_id = $1 AND $2 BETWEEN startsAt AND endsAt`, [societyID, currentDate]);

    return election.rows.length ? election.rows[0] : null;
}

// Gets the offices related to the election
async function getOffices(election_id) {
    const offices = await CLIENT.query(`SELECT * FROM americandreamdb."Office" WHERE election_id = $1`, [election_id]);
    return offices.rows;
}

// Gets the candidates for a specific office
async function getCandidates(office_id) {
    const candidates = await CLIENT.query(`SELECT * FROM americandreamdb."Candidate" WHERE office_id = $1`, [office_id]);
    return candidates.rows;
}

// Gets the initiatives for the election
async function getInitiatives(election_id) {
    const initiatives = await CLIENT.query(`SELECT * FROM americandreamdb."Initiative" WHERE election_id = $1`, [election_id]);
    return initiatives.rows;
}

// Insert session ID (for logged-in users)
function insertSessionID(sessionID, userID, role) {
    const query = `
      INSERT INTO americanDreamDB."Session" ("session_id", "user_id", "role", "timestamp")
      VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
    `;
    CLIENT.query(query, [sessionID, userID, role]);
}

// Fetch currently logged-in users
async function getActiveUsers() {
    const res = await CLIENT.query('SELECT * FROM americanDreamDB."Session"');
    return res.rows;  
}

// Fetch active elections
async function getActiveElections() {
    const currentDate = new Date().toISOString().split('T')[0];
    const query = `
      SELECT * FROM americanDreamDB."Election"
      WHERE CURRENT_DATE BETWEEN "startsAt" AND "endsAt"
    `;
    const res = await CLIENT.query(query);
    return res.rows;
}
  
// Log query execution time
async function logQueryTime(query, params) {
    const start = Date.now(); 
    const res = await CLIENT.query(query, params); 
    const duration = Date.now() - start; 
    
    await CLIENT.query(`
      INSERT INTO americanDreamDB."QueryLogs" ("query", "duration_ms")
      VALUES ($1, $2)
    `, [query, duration]);
    
    return res;
}

// Get average query response time
async function getAvgQueryTime() {
    const res = await CLIENT.query(`
      SELECT AVG("duration_ms") AS avg_duration
      FROM americanDreamDB."QueryLogs"
    `);
    return res.rows[0].avg_duration || 0; // Return 0 if no query logs are found
  }
  
// ----------------------------------------------------------------

async function importUsers(filename){
    const data = fs.readFileSync(filename, 'utf8');
    const lines = data.split('\n');

    for (let line of lines) {
        let fields = line.split('|');
        
        let [u_id, fname, lname, uname, s_id, u_role] = fields;

        const query = `SELECT add_user($1, $2, $3, $4, $5, $6);`;

        try {
            await CLIENT.query(query, fields);
        } catch (error) {
            console.error('Error adding user:', error);
        }
        
    }
}


newConnection('postgres','localhost','americandream','adminpass');
//importUsers('./data/members.psv');
function termconn(){
    CLIENT.end();
}

module.exports = {  getUserData, insertSessionID, addUser, addSociety, addBallot, addCandidate, addOffice,
                    addInitiative, getPreviousElections, getElection, getElectionID, getOngoingElections, getActiveElection, 
                    getOffices, getCandidates, getInitiatives, getActiveUsers, getActiveElections, logQueryTime, getAvgQueryTime,
                    getSocieties, getProfile};
