const express = require('express');
const Task = require('../models/Task');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const sequelize = require('../config/database');
const router = express.Router();
const moment = require('moment');
const { Op } = require('sequelize');

const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

router.get('/tasks', authenticate, async (req, res) => {
  const tasks = await Task.findAll({ where: { user_id: req.user.id } });
  res.json(tasks);
  // const tasksWithoutId = tasks.map(({ id, ...task }) => task);
  // res.json(tasksWithoutId);

  // Transform the Sequelize model instances to plain objects
  // const tasksWithoutId = tasks.map(task => {
  //   const taskObject = task.get({ plain: true });
  //   delete taskObject.id; // Remove the `id` property
  //   return taskObject;
  // });
  // res.json(tasksWithoutId);
});

router.post('/tasks', authenticate, async (req, res) => {
  const { title, description } = req.body;
  const task = await Task.create({ title, description, user_id: req.user.id });
  res.status(201).json(task);
});

router.put('/tasks/:id', authenticate, async (req, res) => {
  const { title, description, status } = req.body;
  try{
    await Task.update({ title, description, status }, { where: { id: req.params.id, user_id: req.user.id } });
    res.json({ message: 'Task updated' });
  }catch(err){
    res.status(500).json({message:'error in updating'});
  }
});

// router.delete('/tasks/:id', authenticate, async (req, res) => {
//   await Task.destroy({ where: { id: req.params.id, user_id: req.user.id } });
//   res.status(204).end();
// });

router.delete('/tasks/:id', authenticate, async (req, res) => {
  try {
    const result = await Task.destroy({ where: { id: req.params.id, user_id: req.user.id } });

    if (result === 0) {
      // No rows affected, It can be a task not found or not authorized
      return res.status(404).json({ error: 'Task not found or you are not authorized to delete this task' });
    }
    res.status(200).json({ message: 'Successful deleted' });;
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the task' });
  }
});


router.get('/tasks/status', authenticate, async (req, res) => {
  const statusCount = await Task.findAll({
    where: { user_id: req.user.id },
    attributes: ['status', [sequelize.fn('COUNT', sequelize.col('status')), 'count']],
    group: ['status'],
  });
  res.json(statusCount);


  //With extra step If time is there then try 
  // try {
  //   // Get the start and end of the current day
  //   const startOfDay = moment().startOf('day').toDate();
  //   const endOfDay = moment().endOf('day').toDate();

  //   // Count tasks grouped by status for the current day
  //   const taskCounts = await Task.findAll({
  //     attributes: [
  //       'status',
  //       [sequelize.fn('COUNT', sequelize.col('status')), 'count']
  //     ],
  //     where: {
  //       user_id: req.user.id,
  //       createdAt: {
  //         [Op.between]: [startOfDay, endOfDay] // Filter tasks created today
  //       }
  //     },
  //     group: ['status']
  //   });

  //   // Format the result
  //   const formattedResult = taskCounts.map(taskCount => ({
  //     status: taskCount.status,
  //     count: parseInt(taskCount.dataValues.count, 10)
  //   }));

  //   res.json(formattedResult);
  // } catch (error) {
  //   res.status(500).json({ error: 'An error occurred while retrieving task status counts' });
  // }

});

module.exports = router;
