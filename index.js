const express = require('express');
const Database = require('./mysqlcon');
const cors = require('cors')
const app = express();
const port = 3001;
app.use(cors());
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
app.get('/university/:id', (req, res) => {
    const { id } = req.params;
    const db = new Database()
    const cn = db.getConnection()
    cn.execute(
        'SELECT * FROM docente WHERE id = ?', [id],
        function (err, results, fields) {
            res.json(results[0])
        }
    );

})

app.post('/university', (req, res) => {
    const body = req.body;
    const db = new Database()
    const cn = db.getConnection()

    const query = `INSERT INTO docente
                ( nombre, direccion,correo) values
                 (?,?,?)`
    cn.execute(
        query, [body.nombre, body.direccion, body.correo],
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
                SET nombre=?, direccion=?, correo=?
                WHERE id=?`;
    cn.execute(
        query, [body.nombre, body.direccion, body.correo,body.id],
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
app.listen(port, () => {
    console.log('Sevidor Express en: http://localhost:' + port);
})

