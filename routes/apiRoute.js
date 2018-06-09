const express = require('express');
const router = express.Router();

const users = require('../controllers/userController');
const type_users = require('../controllers/typeUsersController');
const type_goals = require('../controllers/typeGoalsController');
const achievements = require('../controllers/achievementController');
const challenges = require('../controllers/challengeController');
const goals = require('../controllers/goalController');
const configurations = require('../controllers/configurationController');
const challengeGoalUser = require('../controllers/challengesGoalsUserController');


//Routes for users CRUD
router.get('/users/', users.getAllUsers);
router.get('/users/:mail', users.getSingleUser);
router.post('/users', users.createUser);
router.put('/users/:mail', users.updateUser);
router.delete('/users/:mail', users.removeUser);

//Routes for type of users CRUD
router.get('/type_users/', type_users.getAllTypes);
router.get('/type_users/:id', type_users.getSingleType);
router.post('/type_users', type_users.createType);
router.put('/type_users/:id', type_users.updateType);
router.delete('/type_users/:id', type_users.removeType);

//Routes for type of goals CRUD
router.get('/type_goals/', type_goals.getAllTypes);
router.get('/type_goals/:id', type_goals.getSingleType);
router.post('/type_goals', type_goals.createType);
router.put('/type_goals/:id', type_goals.updateType);
router.delete('/type_goals/:id', type_goals.removeType);

//Routes for achievements CRUD
router.get('/achievements/', achievements.getAllAchievements);
router.get('/achievements/:id', achievements.getSingleAchievement);
router.post('/achievements', achievements.createAchievement);
router.put('/achievements/:id', achievements.updateAchievement);
router.delete('/achievements/:id', achievements.removeAchievement);

//Routes for challenges CRUD
router.get('/challenges/', challenges.getAllChallenges);
router.get('/challenges/:id', challenges.getSingleChallenge);
router.post('/challenges', challenges.createChallenge);
router.put('/challenges/:id', challenges.updateChallenge);
router.delete('/challenges/:id', challenges.removeChallenge);

//Routes for goals CRUD
router.get('/goals/', goals.getAllGoals);
router.get('/goals/:id', goals.getSingleGoal);
router.post('/goals', goals.createGoal);
router.put('/goals/:id', goals.updateGoal);
router.delete('/goals/:id', goals.removeGoal);

//Routes for configurations CRUD
router.get('/configurations/', configurations.getAllConfigurations);
router.get('/configurations/:id', configurations.getSingleConfiguration);
router.post('/configurations', configurations.createConfiguration);
router.put('/configurations/:id', configurations.updateConfiguration);
router.delete('/configurations/:id', configurations.removeConfiguration);

//Routes for challengesXgoalsXusers CRUD
router.get('/challengesGoalsUsers/', challengeGoalUser.getAllChallengesGoalsUser);
router.get('/challengesGoalsUsers/:id', challengeGoalUser.getSingleChallengesGoalsUser);
router.post('/challengesGoalsUsers', challengeGoalUser.createChallengesGoalsUser);
router.put('/challengesGoalsUsers/:id', challengeGoalUser.updateChallengesGoalsUser);
router.delete('/challengesGoalsUsers/:id', challengeGoalUser.removeChallengesGoalsUser);

module.exports = router;
