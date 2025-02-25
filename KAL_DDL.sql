-- Create Script for KAL American Dream Database
-- Luke Doherty
-- Kieran Sullivan
-- Alex Tassiopoulos

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema americanDream
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `americanDream` DEFAULT CHARACTER SET utf8 ;
USE `americanDream` ;

-- -----------------------------------------------------
-- Table `americanDream`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `americanDream`.`User` (
  `user_id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `phone` VARCHAR(45) NULL,
  `role` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  `hasVoted` TINYINT NULL,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `americanDream`.`Initiative`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `americanDream`.`Initiative` (
  `initiative_id` INT NOT NULL,
  `election_id` INT NOT NULL,
  `initName` VARCHAR(45) NULL,
  `subtitle` VARCHAR(45) NULL,
  `description` TEXT NULL,
  `imagePath` VARCHAR(45) NULL,
  `initVotesAllowed` INT NULL,
  `positiveVotes` INT NULL,
  `negativeVotes` INT NULL,
  `neutralVotes` INT NULL,
  PRIMARY KEY (`initiative_id`, `election_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `americanDream`.`Candidate`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `americanDream`.`Candidate` (
  `candidate_id` INT NOT NULL,
  `office_id` INT NOT NULL,
  `candidateName` VARCHAR(45) NULL,
  `subtitle` VARCHAR(45) NULL,
  `description` TEXT NULL,
  `imagePath` VARCHAR(45) NULL,
  `positiveVotes` INT NULL,
  PRIMARY KEY (`candidate_id`, `office_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `americanDream`.`Office`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `americanDream`.`Office` (
  `office_id` INT NOT NULL,
  `election_id` INT NOT NULL,
  `officeName` VARCHAR(45) NULL,
  `officeVotesAllowed` INT NULL,
  PRIMARY KEY (`office_id`, `election_id`),
  CONSTRAINT `Office_Candidate_fk`
    FOREIGN KEY (`office_id`)
    REFERENCES `americanDream`.`Candidate` (`office_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `americanDream`.`Election`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `americanDream`.`Election` (
  `election_id` INT NOT NULL,
  `society_id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `totalVotes` INT NULL,
  `ballotCount` INT NULL,
  `activity` TINYINT NULL,
  `startsAt` DATE NULL,
  `endsAt` DATE NULL,
  PRIMARY KEY (`election_id`, `society_id`),
  CONSTRAINT `Election_Initiative_fk`
    FOREIGN KEY (`election_id`)
    REFERENCES `americanDream`.`Initiative` (`election_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `Election_Office_fk`
    FOREIGN KEY (`election_id`)
    REFERENCES `americanDream`.`Office` (`election_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `americanDream`.`Society`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `americanDream`.`Society` (
  `society_id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `memberCount` INT NULL,
  `avgVote` DOUBLE NULL,
  PRIMARY KEY (`society_id`),
  CONSTRAINT `Society_Election_fk`
    FOREIGN KEY (`society_id`)
    REFERENCES `americanDream`.`Election` (`society_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `americanDream`.`Assignment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `americanDream`.`Assignment` (
  `user_id` INT NOT NULL,
  `society_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `society_id`),
  INDEX `Assignment_Society_fk_idx` (`society_id` ASC) VISIBLE,
  CONSTRAINT `Assignment_User_fk`
    FOREIGN KEY (`user_id`)
    REFERENCES `americanDream`.`User` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `Assignment_Society_fk`
    FOREIGN KEY (`society_id`)
    REFERENCES `americanDream`.`Society` (`society_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `americanDream`.`System`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `americanDream`.`System` (
  `queryTime` INT NULL,
  `httpTime` INT NULL)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
