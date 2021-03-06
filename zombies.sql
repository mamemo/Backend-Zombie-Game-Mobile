DROP DATABASE IF EXISTS zombies;
CREATE DATABASE zombies;

\c zombies;

CREATE TABLE type_users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100)
);
INSERT INTO type_users (name) VALUES('Administrator');
INSERT INTO type_users (name) VALUES('Player');

CREATE TABLE users (
  mail VARCHAR(100) PRIMARY KEY,
  password VARCHAR(100),
  name VARCHAR(100),
  challenges_completed INTEGER,
  points INTEGER,
  zombies_killed INTEGER,
  run_aways INTEGER,
  type_id INTEGER REFERENCES type_users(id)
);


CREATE TABLE challenges (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  description VARCHAR(200),
  latitud_inicial REAL,
  longitud_inicial REAL,
  latitud_final REAL,
  longitud_final REAL,
  zombies_probability REAL
);

CREATE TABLE type_goals (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  stamina INTEGER,
  bullets INTEGER
);
INSERT INTO type_goals (name,stamina,bullets) VALUES('MORE_STAMINA',7,3);
INSERT INTO type_goals (name,stamina,bullets) VALUES('MORE_BULLETS',3,7);
INSERT INTO type_goals (name,stamina,bullets) VALUES('ONLY_STAMINA',5,0);
INSERT INTO type_goals (name,stamina,bullets) VALUES('ONLY_BULLETS',0,5);
INSERT INTO type_goals (name,stamina,bullets) VALUES('EQUAL',4,5);

CREATE TABLE goals (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  latitud REAL,
  longitud REAL,
  points REAL,
  type_id INTEGER REFERENCES type_goals(id),
  challenge_id INTEGER REFERENCES challenges(id)
);

CREATE TABLE achievements (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  description VARCHAR(100)
);
INSERT INTO achievements (name,description) VALUES('Noob','First challenge accomlished.');
INSERT INTO achievements (name,description) VALUES('Getting experience','5 challenges accomlished.');
INSERT INTO achievements (name,description) VALUES('You got it!','10 challenges accomlished.');
INSERT INTO achievements (name,description) VALUES('Runner','5 times running away.');
INSERT INTO achievements (name,description) VALUES('Wild West','5 times shooting at zombies.');

CREATE TABLE configuration (
  id SERIAL PRIMARY KEY,
  volume BOOLEAN,
  vibration BOOLEAN,
  user_mail VARCHAR(100) REFERENCES users(mail)
);

CREATE TABLE challenges_and_goals_x_user (
  id SERIAL PRIMARY KEY,
  user_mail VARCHAR(100) REFERENCES users(mail),
  challenge_id INTEGER REFERENCES challenges(id),
  goal_id INTEGER REFERENCES goals(id)
);

CREATE TABLE achievements_x_user (
  id SERIAL PRIMARY KEY,
  user_mail VARCHAR(100) REFERENCES users(mail),
  achievement_id INTEGER REFERENCES achievements(id)
);
