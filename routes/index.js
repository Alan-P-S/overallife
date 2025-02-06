const express = require('express')
const router = express.Router();


router.get('/',(req,res)=>{
    res.render('home');
})

router.get('/diploma',(req,res)=>{
    res.render('diploma')
})

module.exports = router;