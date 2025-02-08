const express = require('express')
const router = express.Router();
const db = require('../config/database');

router.get('/',(req,res)=>{
    res.render('home');
})

router.get('/diploma',(req,res)=>{
    res.render('diploma')
})
router.get('/cet',(req,res)=>{
    res.render('cet')
})

router.post('/submit', (req, res) => {
    let info = req.body.info;
    const role = req.body.dropmenu;
    if (req.body.dropmenu == "btech"){
        let sql = 'INSERT INTO information (information,code) VALUES (?,?)';
        db.query(sql, [info,role], (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result);
        res.send('Information added...');
        });
    }
    else if(req.body.dropmenu == "arts"){
        let sql = 'INSERT INTO information (information,code) VALUES (?,?)';
        db.query(sql, [info,role], (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result);
        res.send('Information added...');
         });
    }
    
});

router.post('/journel',(req,res) =>{
    const title = req.body.title;
    const content = req.body.content;
    let sql = 'INSERT INTO journals (title,content) VALUES (?,?)';
    db.query(sql,[title,content],(err,result)=>{
        if(err){
            throw err;
        }
        console.log(result);
        res.send('Journel added...');
    });
})

router.get('/create-table', (req, res) => {
    let sql = `
        CREATE TABLE IF NOT EXISTS journals (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            content TEXT NOT NULL
        )
    `;
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result);
        res.send('Table created...');
    });
});

router.get('/dashboard',(req,res)=>{
    res.render('index');
})

router.get('/call',(req,res)=>{
    res.render('call');
})

module.exports = router;