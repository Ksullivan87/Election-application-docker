-- Create Script for KAL American Dream Database
-- Luke Doherty
-- Kieran Sullivan
-- Alex Tassiopoulos

-- -----------------------------------------------------
-- Schema americanDreamDB
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS americanDreamDB;

-- -----------------------------------------------------
-- Table americanDreamDB.User
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS americanDreamDB."User" (
  user_id SERIAL PRIMARY KEY,
  first_name VARCHAR(45),
  last_name VARCHAR(45),
  username VARCHAR(45),
  phone VARCHAR(45),
  society_id INT,
  role VARCHAR(45),
  password VARCHAR(45),
  hasVoted BOOLEAN
);

-- -----------------------------------------------------
-- Table americanDreamDB.Candidate
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS americanDreamDB."Candidate" (
  candidate_id SERIAL PRIMARY KEY,
  office_id INT NOT NULL,
  candidateName VARCHAR(45),
  subtitle VARCHAR(45),
  description TEXT,
  imagePath VARCHAR(45),
  positiveVotes INT
);

-- -----------------------------------------------------
-- Table americanDreamDB.Office
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS americanDreamDB."Office" (
  office_id SERIAL PRIMARY KEY,
  election_id INT NOT NULL,
  officeName VARCHAR(45),
  officeVotesAllowed INT,
  CONSTRAINT Office_Candidate_fk
    FOREIGN KEY (office_id)
    REFERENCES americanDreamDB."Candidate" (office_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table americanDreamDB.Initiative
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS americanDreamDB."Initiative" (
  initiative_id SERIAL PRIMARY KEY,
  election_id INT NOT NULL,
  initName VARCHAR(45),
  subtitle VARCHAR(45),
  description TEXT,
  imagePath VARCHAR(45),
  initVotesAllowed INT,
  positiveVotes INT,
  negativeVotes INT,
  neutralVotes INT
);

-- -----------------------------------------------------
-- Table americanDreamDB.Election
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS americanDreamDB."Election" (
  election_id SERIAL PRIMARY KEY,
  society_id INT NOT NULL,
  name VARCHAR(45),
  totalVotes INT,
  ballotCount INT,
  activity BOOLEAN,
  startsAt DATE,
  endsAt DATE,
  CONSTRAINT Election_Initiative_fk
    FOREIGN KEY (election_id)
    REFERENCES americanDreamDB."Initiative" (election_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT Election_Office_fk
    FOREIGN KEY (election_id)
    REFERENCES americanDreamDB."Office" (election_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table americanDreamDB.Society
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS americanDreamDB."Society" (
  society_id SERIAL PRIMARY KEY,
  name VARCHAR(45),
  memberCount INT,
  avgVote DOUBLE PRECISION,
  CONSTRAINT Society_Election_fk
    FOREIGN KEY (society_id)
    REFERENCES americanDreamDB."Election" (society_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table americanDreamDB.Assignment
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS americanDreamDB."Assignment" (
  user_id INT NOT NULL,
  society_id INT NOT NULL,
  PRIMARY KEY (user_id, society_id),
  CONSTRAINT Assignment_User_fk
    FOREIGN KEY (user_id)
    REFERENCES americanDreamDB."User" (user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT Assignment_Society_fk
    FOREIGN KEY (society_id)
    REFERENCES americanDreamDB."Society" (society_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table americanDreamDB.System
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS americanDreamDB."System" (
  queryTime INT,
  httpTime INT
);

-- -----------------------------------------------------
-- Insert Test Users 1, 2, 3, 4
-- -----------------------------------------------------
INSERT INTO americanDreamDB."User" (user_id, name, email, phone, role, password, hasVoted) VALUES
(1, 'test1', NULL, NULL, 'member', '!testPass1', NULL),
(2, 'test2', NULL, NULL, 'officer', '!testPass2', NULL),
(3, 'test3', NULL, NULL, 'employee', '!testPass3', NULL),
(4, 'test4', NULL, NULL, 'administrator', '!testPass4', NULL);
