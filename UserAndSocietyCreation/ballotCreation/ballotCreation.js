let initiatives = [];
let candidates = [];

async function addBallotRequest(societyName, electionName) {
  const res = await fetch("http://localhost:3000/ballotcreate", {
    method: "POST",
    body: JSON.stringify({"societyName": societyName, "electionName": electionName, "initiatives": initiatives, "candidates": candidates})
  });
  console.log(await res.text());
}

function addInitiative(name, description) {
  initiatives.push({"name" : name, "description" : description});
  console.log(initiatives);
}

function addCandidate(name, description, office) {
  candidates.push({"name": name, "office": office, "description": description});
  console.log(candidates);
}

async function addOffice(name, elecName) {
  const res = await fetch("http://localhost:3000/addoffice", {
    method: "POST",
    body: "{'test': 'testbody'}"//JSON.stringify({"officeName": name, "elec_name": elecName})
  });
  console.log(await res.text());
}