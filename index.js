const express = require('express');
const Database = require('./mysqlcon');
const cors = require('cors')


const app = express();
app.use(cors());
const port = 3001;

app.use(express.json())

app.get('/', (req, res)=>{
    res.send('Servidor OK !!!');
})

app.get('/university', (req, res)=>
{ 
    const db= new Database()
    const cn=db.getConnection()
    cn.execute(
        'SELECT * from docente',[],
        function(err, results, fields) {      
          res.json(results)      
        }
      );   
 
})

app.post('/university', (req, res) => {
    const body = req.body;
    const db = new Database()
    const cn = db.getConnection()

    const query = `INSERT INTO docente
                (id, nombre, direccion,correo) values
                 (?,?,?,?)`
    cn.execute(
        query, [body.id, body.nombre, body.direccion, body.correo],
        function (err, results, fields) {
            if (err) {
                res.status(500).json({
                    message: err.message
                })
            }
            else {
                res.json(body)
            }
        }
    );

})
app.put('/university', (req, res) => {
    const body = req.body;
    console.log (body);
    const db = new Database()
    const cn = db.getConnection()

    const query = `UPDATE docente     
                SET id=?, nombre=?, direccion=?, correo=?,` ;
    cn.execute(
        query, [body.id, body.nombre, body.direccion, body.correo, ],
        function (err, results, fields) {
            if (err) {
                res.status(500).json({
                    message: err.message
                })
            }
            else {
                res.json(body)
            }
        }
    );
})


app.post('/university', (req, res)=>{
    const body = req.body;
    res.json(body)
})


app.listen(port, () => {
    console.log('localhost:'+port);
})