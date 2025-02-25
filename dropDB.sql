-- Drop Script for americanDreamDB

-- Drop Foreign Key Constraints
ALTER TABLE IF EXISTS americanDreamDB."Initiative" DROP CONSTRAINT IF EXISTS Initiative_Election_fk;
ALTER TABLE IF EXISTS americanDreamDB."Office" DROP CONSTRAINT IF EXISTS Office_Election_fk;
ALTER TABLE IF EXISTS americanDreamDB."Candidate" DROP CONSTRAINT IF EXISTS Candidate_Office_fk;
ALTER TABLE IF EXISTS americanDreamDB."User" DROP CONSTRAINT IF EXISTS User_Society_fk;
ALTER TABLE IF EXISTS americanDreamDB."Assignment" DROP CONSTRAINT IF EXISTS Assignment_User_fk;
ALTER TABLE IF EXISTS americanDreamDB."Assignment" DROP CONSTRAINT IF EXISTS Assignment_Society_fk;

-- Drop Tables
DROP TABLE IF EXISTS americanDreamDB."QueryLogs" CASCADE;
DROP TABLE IF EXISTS americanDreamDB."Session" CASCADE;
DROP TABLE IF EXISTS americanDreamDB."System" CASCADE;
DROP TABLE IF EXISTS americanDreamDB."Assignment" CASCADE;
DROP TABLE IF EXISTS americanDreamDB."Candidate" CASCADE;
DROP TABLE IF EXISTS americanDreamDB."Office" CASCADE;
DROP TABLE IF EXISTS americanDreamDB."Initiative" CASCADE;
DROP TABLE IF EXISTS americanDreamDB."Election" CASCADE;
DROP TABLE IF EXISTS americanDreamDB."User" CASCADE;
DROP TABLE IF EXISTS americanDreamDB."Society" CASCADE;

-- Drop Schema
DROP SCHEMA IF EXISTS americanDreamDB CASCADE;

DO $$
BEGIN
    IF EXISTS (
        SELECT schema_name
        FROM information_schema.schemata
        WHERE schema_name = 'americanDreamDB'
    ) THEN
        RAISE NOTICE 'Schema americanDreamDB still exists.';
    ELSE
        RAISE NOTICE 'Schema americanDreamDB successfully dropped.';
    END IF;
END $$;
