import * as utils from './utils.js'; //for when we actual write the code

//User Table tests
test(`User must have a Password`, () => {
    expect( utils.UserInsert(``,`Passw0rd!`) ).toBe(false) ;
});
test(`User must have a Uname`, () => {
    expect( utils.UserInsert(`DougDimmadome23`,``) ).toBe(false) ;
});

//initiative table tests
test(`Initiative must have name`, () => {
    expect( utils.InitiativeInsert(`1`,`22`,``) ).toBe(false) ;
});
test(`Initiative must have valid electionID`, () => {
    expect( utils.InitiativeInsert(`1`,`12j`,`RailroadInitiative`) ).toBe(false) ;
});
test(`Initiative must have valid initiativeID`, () => {
    expect( utils.InitiativeInsert(`wormInitiative`,`12`,`wormInitative`) ).toBe(false) ;
});

//Candidate table tests
test(`Candidate must have an ID`, () => {
    expect( utils.CandidateInsert(``,`22`,`Jeremy Walsh`) ).toBe(false) ;
});
test(`Candidate must have an officeID`, () => {
    expect( utils.CandidateInsert(`1`,``,`Jeremy Walsh`) ).toBe(false) ;
});
test(`Candidate must have a name`, () => {
    expect( utils.CandidateInsert(`1`,`22`,``) ).toBe(false) ;
});

//Office table tests
test(`Office must have an ID`, () => {
    expect( utils.OfficeInsert(``,`22`,`CEO`) ).toBe(false) ;
});
test(`Office must have an Election ID`, () => {
    expect( utils.OfficeInsert(`12`,``,`CEO`) ).toBe(false) ;
});
test(`Office must have a name`, () => {
    expect( utils.OfficeInsert(`12`,`22`,``) ).toBe(false) ;
});

//Election table tests
test(`Election must have an ID`, () => {
    expect( utils.ElectionInsert(``,`22`,`Fall 2024 General Election`) ).toBe(false) ;
});
test(`Election must have a society ID`, () => {
    expect( utils.ElectionInsert(`14`,``,`Fall 2024 General Election`) ).toBe(false) ;
});
test(`Election must have a name`, () => {
    expect( utils.ElectionInsert(`14`,`22`,``) ).toBe(false) ;
});