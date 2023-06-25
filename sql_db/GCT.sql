CREATE DATABASE `GCT` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `GCT`;
CREATE TABLE Users (
  id INT NOT NULL,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE Profiles (
  user_id INT NOT NULL,
  name VARCHAR(255),
  surname VARCHAR(255),
  country VARCHAR(255),
  date_of_birth DATE,
  gender VARCHAR(255),
  bio TEXT,
  game_platforms VARCHAR(255),
  discord_url VARCHAR(255),
  platforms_url VARCHAR(255),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  
  FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE Games (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(255),
  genre VARCHAR(255),
  platform VARCHAR(255),
  PRIMARY KEY (id)
);

CREATE TABLE Ankets (
  id INT NOT NULL,
  game_name VARCHAR(255),
  description VARCHAR(255),
  role_play VARCHAR(255),
  statistics VARCHAR(255),
  top_skills VARCHAR(255),
  age_diap VARCHAR(255),
  gender_prep VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE ProfileGames (
  user_id INT NOT NULL,
  game_id INT NOT NULL,
  PRIMARY KEY (user_id, game_id),
  FOREIGN KEY (user_id) REFERENCES Users(id),
  FOREIGN KEY (game_id) REFERENCES Games(id)
);

CREATE TABLE ProfileAnkets (
  user_id INT NOT NULL,
  anket_id INT NOT NULL,
  PRIMARY KEY (user_id, anket_id),
  FOREIGN KEY (user_id) REFERENCES Users(id),
  FOREIGN KEY (anket_id) REFERENCES Ankets(id)
);

