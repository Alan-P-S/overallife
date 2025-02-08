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

router.post('/submit-info', (req, res) => {
    let info = req.body.info;
    let sql = 'INSERT INTO information (infos) VALUES (?)';
    db.query(sql, [info], (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result);
        res.send('Information added...');
    });
});

router.get('/dashboard',(req,res)=>{
    res.render('index');
})

module.exports = router;