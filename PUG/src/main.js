const express = require('express')

const app = express();

const ProductosApi = require('./../Api/productos')
const productosApi = new ProductosApi('./../Api/productos.txt')

const producto = [];


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set('views','../views')
app.set('view engine', 'pug');

app.get('/form',async(req,res)=>{
    
    res.render('form',{producto})
})
app.get('/historialview',async(req,res)=>{
    const producto = await productosApi.listarAll()
    res.render('historialview',{producto})
})

app.post('/personas',async(req,res)=>{
    const  product  = req.body
    const producto = await productosApi.guardar(product)
    res.redirect('/historialview');
})

app.listen(8080)