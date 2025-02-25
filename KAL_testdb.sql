-- Create Script for KAL American Dream Database
-- Luke Doherty
-- Kieran Sullivan
-- Alex Tassiopoulos

-- -----------------------------------------------------
-- Schema americanDreamDB
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS americanDreamDB;

-- -----------------------------------------------------
-- Table americanDreamDB.Society
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS americanDreamDB."Society" (
  "society_id" SERIAL PRIMARY KEY,
  "name" VARCHAR(45),
  "memberCount" INT,
  "avgVote" DOUBLE PRECISION
);

-- -----------------------------------------------------
-- Table americanDreamDB.Election
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS americanDreamDB."Election" (
  "election_id" SERIAL PRIMARY KEY,
  "society_id" INT NOT NULL,
  "name" VARCHAR(45),
  "totalVotes" INT,
  "ballotCount" INT,
  "activity" BOOLEAN,
  "startsAt" DATE,
  "endsAt" DATE
);

-- -----------------------------------------------------
-- Table americanDreamDB.Initiative
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS americanDreamDB."Initiative" (
  "initiative_id" SERIAL PRIMARY KEY,
  "election_id" INT NOT NULL UNIQUE,
  "initName" VARCHAR(45),
  "subtitle" VARCHAR(45),
  "description" TEXT,
  "imagePath" VARCHAR(45),
  "initVotesAllowed" INT,
  "positiveVotes" INT,
  "negativeVotes" INT,
  "neutralVotes" INT
);

-- -----------------------------------------------------
-- Table americanDreamDB.Office
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS americanDreamDB."Office" (
  "office_id" SERIAL PRIMARY KEY,
  "election_id" INT NOT NULL,
  "officeName" VARCHAR(45),
  "officeVotesAllowed" INT
);

-- -----------------------------------------------------
-- Table americanDreamDB.Candidate
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS americanDreamDB."Candidate" (
  "candidate_id" SERIAL PRIMARY KEY,
  "office_id" INT NOT NULL,
  "candidateName" VARCHAR(45),
  "subtitle" VARCHAR(45),
  "description" TEXT,
  "imagePath" VARCHAR(45),
  "positiveVotes" INT
);

-- -----------------------------------------------------
-- Table americanDreamDB.User
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS americanDreamDB."User" (
  "user_id" SERIAL PRIMARY KEY,
  "first_name" VARCHAR(45),
  "last_name" VARCHAR(45),
  "username" VARCHAR(45),
  "phone" VARCHAR(45),
  "society_id" INT,
  "role" VARCHAR(45),
  "password" VARCHAR(45),
  "hasVoted" BOOLEAN
);

-- -----------------------------------------------------
-- Table americanDreamDB.Assignment
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS americanDreamDB."Assignment" (
  "user_id" INT NOT NULL,
  "society_id" INT NOT NULL,
  PRIMARY KEY ("user_id", "society_id")
);

-- -----------------------------------------------------
-- Table americanDreamDB.System
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS americanDreamDB."System" (
  "queryTime" INT,
  "httpTime" INT
);

-- -----------------------------------------------------
-- Table americanDreamDB.Session
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS americanDreamDB."Session" (
  "session_id" VARCHAR(255) PRIMARY KEY,
  "user_id" INT,
  "role" VARCHAR(45),
  "timestamp" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------
-- Table americanDreamDB.QueryLogs
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS americanDreamDB."QueryLogs" (
  "timestamp" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "query" TEXT,
  "duration_ms" INT
);


-- -----------------------------------------------------
-- Add Foreign Key Constraints
-- -----------------------------------------------------
ALTER TABLE americanDreamDB."Initiative"
  ADD CONSTRAINT Initiative_Election_fk
  FOREIGN KEY ("election_id")
  REFERENCES americanDreamDB."Election" ("election_id")
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE americanDreamDB."Office"
  ADD CONSTRAINT Office_Election_fk
  FOREIGN KEY ("election_id")
  REFERENCES americanDreamDB."Election" ("election_id")
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE americanDreamDB."Candidate"
  ADD CONSTRAINT Candidate_Office_fk
  FOREIGN KEY ("office_id")
  REFERENCES americanDreamDB."Office" ("office_id")
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE americanDreamDB."User"
  ADD CONSTRAINT User_Society_fk
  FOREIGN KEY ("society_id")
  REFERENCES americanDreamDB."Society" ("society_id")
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE americanDreamDB."Assignment"
  ADD CONSTRAINT Assignment_User_fk
  FOREIGN KEY ("user_id")
  REFERENCES americanDreamDB."User" ("user_id")
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE americanDreamDB."Assignment"
  ADD CONSTRAINT Assignment_Society_fk
  FOREIGN KEY ("society_id")
  REFERENCES americanDreamDB."Society" ("society_id")
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

-- -----------------------------------------------------
-- Insert Test Users 1, 2, 3, 4
-- -----------------------------------------------------
INSERT INTO americanDreamDB."User" ("first_name", "last_name", "username", "phone", "role", "password", "hasVoted") VALUES
('test1', 'User', 'test1', NULL, 'member', '!testPass1', NULL),
('test2', 'User', 'test2', NULL, 'officer', '!testPass2', NULL),
('test3', 'User', 'test3', NULL, 'employee', '!testPass3', NULL),
('test4', 'User', 'test4', NULL, 'administrator', '!testPass4', NULL);
