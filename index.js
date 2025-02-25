const express = require('express');
const path = require('path');
const app = express();
const {validateLogin, createOffice, createBallot, createUser, createSociety, callPreviousElections, callOngoingElections, callElection,callSocieties, getActiveElectionByUser, getSystemStats, getElectionData, callProfile} = require('./businessLayer.js');
const port = 3000;

app.use(express.static(path.join(__dirname, '/public/')));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
    // const start = Date.now(); This function need to be in this app.use, but the query should happen in the business layer
    // res.on('finish', () => {
    //    const duration = Date.now() - start; 
  
    //   CLIENT.query(`
    //      INSERT INTO americanDreamDB."System" ("queryTime", "httpTime")
    //      VALUES ($1, $2)
    //    `, [duration, res.statusCode]);
    // });
    // next();
});

app.use(express.json());

app.post("/login", async function(req, res) {
	console.log(req.body);
	const uname = req.body.username;
	const pwrd = req.body.password;
        const returnVal = await validateLogin(uname, pwrd);
        if(returnVal === "") {
            return res.status(400).send("Bad password...");
        }
        return res.status(200).send(returnVal);
});

app.post("/usrcreate", async function(req, res) {
	console.log(req.body);
	const uname = req.body.username;
	const role = req.body.role;
	const fname = req.body.fname;
	const lname = req.body.lname;
	const phone = req.body.phone;
        const returnVal = await createUser(uname, role, fname, lname, phone);
        if(returnVal === "") {
            return res.status(400).send("Bad user info...");
        }
        return res.status(200).send(returnVal);
});

app.get("/api/pastElections", async (req, res) => {

        const returnVal = await callPreviousElections();
        if(returnVal === "") {
            return res.status(400).send("Bad user info...");
        } else {
            return res.status(200).send(returnVal);
        }
});

app.get("/pastElections", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/pastElections/index.html"));
});

app.get("/api/societyView", async function(req, res) {

    const returnVal = await callSocieties();
    if(returnVal === "") {
        return res.status(400).send("Bad user info...");
    } else {
        return res.status(200).send(returnVal);
    }
});

app.get("/societyView", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/societyView/index.html"));
});

app.get("/api/profileView", async function(req, res) {

    const returnVal = await callProfile();
    if(returnVal === "") {
        return res.status(400).send("Bad user info...");
    } else {
        return res.status(200).send(returnVal);
    }
});

app.get("/profileView", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/profileView/index.html"));
});

app.get("/api/ongoingElections", async function(req, res) {

    const returnVal = await callOngoingElections();
    if(returnVal === "") {
        return res.status(400).send("Bad user info...");
    } else {
        return res.status(200).send(returnVal);
    }
});

app.get("/ongoingElections", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/onGoingElections/index.html"));
});
          
app.post("/soccreate", async function(req, res) {
	console.log(req.body);
	const socName = req.body.societyName;
        const returnVal = await createSociety(socName);
        if(returnVal === "") {
            return res.status(400).send("Bad society name...");
        }
        return res.status(200).send(returnVal);
});

app.get("/ElectionView", async function(req, res) {

    const returnVal = await callElection();
    if(returnVal === "") {
        return res.status(400).send("Bad user info...");
    }
    return res.status(200).send(returnVal);
});

app.post("/ballotcreate", async function(req, res) {
	console.log(req.body);
	const socName = req.body.societyName;
	const elecName = req.body.electionName;
	const cndts = req.body.candidates;
	const inits = req.body.initiatives;
        const returnVal = await createBallot(socName, elecName, cndts, inits);
        if(returnVal === "") {
            return res.status(400).send("Bad ballot info...");
        }
        return res.status(200).send(returnVal);
});

// ---------------------------------------------------------------- Luke API calls

// Gets active election for logged in user for ballot page
app.get("/activeelectionget", async function(req, res) {
    console.log(req.body);
    const user_id = req.body.user_id;
    const returnVal = await getActiveElectionByUser(user_id);
    if(returnVal === "") {
        return res.status(400).send("Bad user id...");
    }
    return res.status(200).send(returnVal);
});

// Track HTTP response times
//app.use((req, res, next) => {
//     const start = Date.now(); 
//     res.on('finish', () => {
//       const duration = Date.now() - start; 
  
//       CLIENT.query(`
//         INSERT INTO americanDreamDB."System" ("queryTime", "httpTime")
//         VALUES ($1, $2)
//       `, [duration, res.statusCode]);
//     });
//     next();
// });
  
// Sends system stats to systemstats.js
app.get('/system-stats', async (req, res) => {
    try {
        const stats = await getSystemStats();
        
        res.json(stats);
    } catch (error) {
        console.error('Error fetching system stats:', error);
        res.status(500).json({ error: 'Failed to retrieve system stats.' });
    }
});

// Gets current active election for logged in user
app.get("/getActiveElection", async function(req, res) {
    const user_id = req.body.user_id;  
    const electionData = await getElectionData(user_id);
    
    if (!electionData) {
        return res.status(404).send("No active election found.");
    }

    return res.status(200).json(electionData);
});

app.post("/addoffice", async function(req, res) {
    const officeName = req.body.name;
    const elecName = req.body.elec_name;
    if (await createOffice(officeName, elecName) !== -1) {
        return res.status(200).send("Office added succesfully.");
    } else {
        return res.status(400).send("Office not added.");
    }
});

// Submits vote to the candidate/initiatives of choice
app.post("/submitVote", async function(req, res) {
    const { candidates, initiatives } = req.body;
    // WIP
    
    return res.status(200).send("Vote successfully submitted.");
});

// ----------------------------------------------------------------

app.listen(
    port,
    () => {console.log(`API alive at http://localhost:3000`)}
);
