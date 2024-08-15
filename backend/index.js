const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', taskRoutes);

app.get('/',(req,res)=>{
    res.status(200).json({ message: 'sajbdshabd' });
})

sequelize.sync({ force: false }).then(() => {
  app.listen(5000, () => console.log('Server running on port 5000'));
});


