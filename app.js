const express = require('express')
const app = express()
const admin = require('./rotas/admin')
const handlebars = require('express-handlebars')
const mongoose = require('mongoose')
const flash = require('connect-flash')
const session = require('express-session')
require("./models/Conteudo")
const Conteudo = mongoose.model("conteudos")
require("./models/Categorias")
const Categoria = mongoose.model("categorias")


 app.use(session({
    secret: "cursodenode",
    resave:true,
    saveUninitialized: true
}))
 app.use(flash())

 //Middleware
 app.use((req,res,next)=>{
     res.locals.success_msg = req.flash("success_msg")
     res.locals.error_msg = req.flash("error_msg")
     next()
 })
 app.use(express.urlencoded({extended:true}))
 app.use(express.json())
 
 //mongoose 
 mongoose.connect("mongodb+srv://Adao:326159487@blog.grj0buq.mongodb.net/blog").then(()=>{
     useMongoClient:true
             console.log("MongoDB Conectado")
         }).catch((err)=>{
             console.log("Erro: " + err)
         })
 app.engine('handlebars', handlebars.engine({defaultLayout: "main"}))

app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.get('/',(req,res)=>{

    
    Conteudo.find().then((assunto)=>{

        Categoria.find().lean().then((teste)=>{
        res.render("index", {navbar:true,teste:teste, assunto: assunto.map(assunto => assunto.toJSON())})

        })
    })
})


app.get('/:slug', (req,res)=>{
    Conteudo.findOne({slug:req.params.slug}).lean().then((conteudo)=>{
         res.render('blog/conteudo',{content:true,conteudo:conteudo})
    }).catch((eerr)=>{
        res.redirect('/')
    })
   
})






app.use('/admin',admin)

const PORT = process.env.PORT || 8080
app.listen(PORT,()=>{
    console.log("serve rodando! http://localhost:8080" )
}) 