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

app.get('/usuarios', (req, res)=>
{ 
  
    const db= new Database()
    const cn=db.getConnection()
    cn.execute(
        'SELECT * from usuarios',[],
        function(err, results, fields) {      
          res.json(results)      
        }
      );   
 
})

app.get('/tarea', (req, res)=>
{ 
    
    const db= new Database()
    const cn=db.getConnection()
    cn.execute(
        'SELECT * from tarea',[],
        function(err, results, fields) {      
          res.json(results)      
        }
      );   
 
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

app.put('/university', (req, res) => {
    console.log('Actualizando')
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

app.get('/tarea/:id', (req, res) => {
    const { id } = req.params;
    const db = new Database()
    const cn = db.getConnection()
    cn.execute(
        'SELECT * FROM tarea WHERE id = ?', [id],
        function (err, results, fields) {
            res.json(results[0])
        }
    );

})

app.post('/tarea', (req, res) => {
    const body = req.body;
    const db = new Database()
    const cn = db.getConnection()

    const query = `INSERT INTO tarea
                ( descripcion, dificultad,fecha,docente_id) values
                 (?,?,?,?)`
    cn.execute(
        query, [body.descripcion, body.dificultad, body.fecha,body.docente_id],
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
app.put('/usuarios', (req, res) => {
    const body = req.body;
    console.log (body);
    const db = new Database()
    const cn = db.getConnection()

    const query = `UPDATE tarea   
                SET descripcion=?, dificultad=?, fecha=?, docente_id=?
                WHERE id=?`;
    cn.execute(
        query, [body.descripcion, body.dificultad, body.fecha,body.docente_id,body.id],
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


app.get('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const db = new Database()
    const cn = db.getConnection()
    cn.execute(
        'SELECT * FROM usuarios WHERE id = ?', [id],
        function (err, results, fields) {
            res.json(results[0])
        }
    );

})


})

app.post('/usuarios', (req, res) => {
    const body = req.body;
    const db = new Database()
    const cn = db.getConnection()

    const query = `INSERT INTO usuarios
                ( username, password,status) values
                 (?,?,?)`
    cn.execute(
        query, [body.username, body.password, body.status],
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


app.put('/usuarios', (req, res) => {
    const body = req.body;
    console.log (body);
    const db = new Database()
    const cn = db.getConnection()

    const query = `UPDATE usuarios    
                SET username=?, password=?, status=?
                WHERE id=?`;
    cn.execute(
        query, [body.username, body.password, body.status,body.id],
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

