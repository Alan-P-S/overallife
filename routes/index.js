const express = require('express')
const router = express.Router();


router.get('/',(req,res)=>{
    res.render('home');
})

router.get('/diploma',(req,res)=>{
    res.render('diploma')
})
router.get('/cet',(req,res)=>{
    res.render('cet')
})

module.exports = router;