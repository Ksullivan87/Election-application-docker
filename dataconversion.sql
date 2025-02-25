CREATE TABLE americanDreamDB."StagingData" (
  "member_id" INT,
  "election_id" INT,
  "office_id" INT,
  "candidate_id" INT
);

COPY americanDreamDB."StagingData" ("member_id", "election_id", "office_id", "candidate_id")
FROM '/home/student/Downloads/election_data/votes.psv'
DELIMITER '|'
CSV HEADER;

-- Insert into User table (ensure the user exists or handle duplicates)
INSERT INTO americanDreamDB."User" ("user_id", "society_id", "role", "password", "hasVoted")
SELECT DISTINCT "member_id", NULL, 'member', NULL, NULL
FROM americanDreamDB."StagingData"
ON CONFLICT ("user_id") DO NOTHING; -- Adjust conflict handling as needed

-- Insert into Election table (ensure election_id exists)
INSERT INTO americanDreamDB."Election" ("election_id", "society_id", "name", "totalVotes", "ballotCount", "activity", "startsAt", "endsAt")
SELECT DISTINCT "election_id", NULL, NULL, NULL, NULL, NULL, NULL, NULL
FROM americanDreamDB."StagingData"
ON CONFLICT ("election_id") DO NOTHING; -- Adjust conflict handling as needed

-- Insert into Office table (ensure office_id exists)
INSERT INTO americanDreamDB."Office" ("office_id", "election_id", "officeName", "officeVotesAllowed")
SELECT DISTINCT "office_id", "election_id", NULL, NULL
FROM americanDreamDB."StagingData"
ON CONFLICT ("office_id") DO NOTHING; -- Adjust conflict handling as needed

-- Insert into Candidate table (ensure candidate_id exists)
INSERT INTO americanDreamDB."Candidate" ("candidate_id", "office_id", "candidateName", "subtitle", "description", "imagePath", "positiveVotes")
SELECT DISTINCT "candidate_id", "office_id", NULL, NULL, NULL, NULL, NULL
FROM americanDreamDB."StagingData"
ON CONFLICT ("candidate_id") DO NOTHING; -- Adjust conflict handling as needed

DROP TABLE IF EXISTS americanDreamDB."StagingData";

