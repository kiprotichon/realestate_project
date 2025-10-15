const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { User } = require('../models');
// register
router.post('/register', async (req,res)=>{
  try{
    const { name,email,password,role } = req.body;
    const existing = await User.findOne({ where: { email }});
    if(existing) return res.status(400).json({ message: 'Email exists' });
    const user = await User.create({ name,email,password,role });
    res.json({ user: user.toJSON() });
  }catch(err){ res.status(500).json({ error: err.message }); }
});
// login
router.post('/login', async (req,res)=>{
  try{
    const { email,password } = req.body;
    const user = await User.findOne({ where: { email }});
    if(!user) return res.status(401).json({ message: 'Invalid credentials' });
    const valid = await user.validatePassword(password);
    if(!valid) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id, role: user.role, name: user.name }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
    res.json({ token, user: user.toJSON() });
  }catch(err){ res.status(500).json({ error: err.message }); }
});
module.exports = router;
