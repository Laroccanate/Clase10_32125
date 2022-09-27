const express = require ('express')
const app = express()

const exphbs = require("express-handlebars")
const ProductosApi = require('../Api/productos')

const productosApi = new ProductosApi ('./../Api/ProductosApi.txt')

const producto = [];

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.engine('handlebars', exphbs.engine({extname:".handlebars", defaultLayout:"form.hbs", defaultLayout:false}))
app.set("view","../views")
app.set("view enfine", "handlebars")

app.get('/form', async(req,res)=>{
    res.render("form",{producto})
})

app.get('/historialview', async(req,res)=>{
    const producto = await productosApi.listarAll()
    res.render('historialview',{producto})
})

app.post('/personas',async(req,res)=>{
    const product = req.body
    const producto = await productosApi.guardar(product)
    res.redirect('historialview');
})

const PORT = 8080
const server = app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error=> console.log(`Error en el servidor ${error}`))


