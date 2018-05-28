const express = require('express');
const router = express.Router();

const users = require('../controllers/userController');
const type_users = require('../controllers/typeUsersController');
const type_goals = require('../controllers/typeGoalsController');
const achievements = require('../controllers/achievementController');
const challenges = require('../controllers/challengeController');
const goals = require('../controllers/goalController');

router.get('/users/', users.getAllUsers);
router.get('/users/:id', users.getSingleUser);
router.post('/users', users.createUser);
router.put('/users/:id', users.updateUser);
router.delete('/users/:id', users.removeUser);

router.get('/type_users/', type_users.getAllTypes);
router.get('/type_users/:id', type_users.getSingleType);
router.post('/type_users', type_users.createType);
router.put('/type_users/:id', type_users.updateType);
router.delete('/type_users/:id', type_users.removeType);

router.get('/type_goals/', type_goals.getAllTypes);
router.get('/type_goals/:id', type_goals.getSingleType);
router.post('/type_goals', type_goals.createType);
router.put('/type_goals/:id', type_goals.updateType);
router.delete('/type_goals/:id', type_goals.removeType);

router.get('/achievements/', achievements.getAllAchievements);
router.get('/achievements/:id', achievements.getSingleAchievement);
router.post('/achievements', achievements.createAchievement);
router.put('/achievements/:id', achievements.updateAchievement);
router.delete('/achievements/:id', achievements.removeAchievement);

router.get('/challenges/', challenges.getAllChallenges);
router.get('/challenges/:id', challenges.getSingleChallenge);
router.post('/challenges', challenges.createChallenge);
router.put('/challenges/:id', challenges.updateChallenge);
router.delete('/challenges/:id', challenges.removeChallenge);

router.get('/goals/', goals.getAllGoals);
router.get('/goals/:id', goals.getSingleGoal);
router.post('/goals', goals.createGoal);
router.put('/goals/:id', goals.updateGoal);
router.delete('/goals/:id', goals.removeGoal);

module.exports = router;
