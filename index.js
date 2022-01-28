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

app.get('/universidadU', (req, res)=>
{ 
    const db= new Database()
    const cn=db.getConnection()
    cn.execute(
        'SELECT * from profesor ',[],
        function(err, results, fields) {      
          res.json(results)      
        }
      );   
 
})

app.post('/universidadU', (req, res) => {
    const body = req.body;
    const db = new Database()
    const cn = db.getConnection()

    const query = `INSERT INTO paises 
                (nombre, apellido, correo,ciudad) values
                 (?,?,?,?)`
    cn.execute(
        query, [body.nombre, body.apellido, body.correo, body.ciudad],
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


app.post('/universidadU', (req, res)=>{
    const body = req.body;
    res.json(body)
})


app.listen(port, () => {
    console.log('localhost:'+port);
})