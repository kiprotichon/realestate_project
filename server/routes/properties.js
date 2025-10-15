const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { Property, User } = require('../models');
const jwt = require('jsonwebtoken');
const upload = multer({ dest: path.join(__dirname, '..', 'uploads') });
function auth(req,res,next){
  const h = req.headers.authorization;
  if(!h) return res.status(401).json({ message: 'No token' });
  const token = h.split(' ')[1];
  try{
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = payload; next();
  }catch(e){ res.status(401).json({ message: 'Invalid token' }); }
}
// create
router.post('/', auth, upload.single('image'), async (req,res)=>{
  try{
    const { title,description,price,location } = req.body;
    const imageUrl = req.file ? '/uploads/' + req.file.filename : null;
    const p = await Property.create({ title,description,price,location,imageUrl, userId: req.user.id });
    res.json(p);
  }catch(err){ res.status(500).json({ error: err.message }); }
});
// list with search
router.get('/', async (req,res)=>{
  try{
    const q = req.query.q || '';
    const props = await Property.findAll({ where: { title: { [require('sequelize').Op.like]: '%' + q + '%' } }, include: [{ model: User, as: 'owner', attributes: ['id','name','email'] }], order:[['createdAt','DESC']] });
    res.json(props);
  }catch(err){ res.status(500).json({ error: err.message }); }
});
// get single
router.get('/:id', async (req,res)=>{
  try{ const p = await Property.findByPk(req.params.id, { include:[{ model: User, as:'owner', attributes:['id','name','email'] }] }); if(!p) return res.status(404).json({ message:'Not found' }); res.json(p); }catch(err){ res.status(500).json({ error: err.message }); }
});
module.exports = router;
