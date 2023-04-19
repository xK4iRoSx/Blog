const express = require('express')
const admin = express.Router()
const mongoose = require('mongoose')
const slugify = require('slugify')
require("../models/Categorias")
const Categoria = mongoose.model("categorias")
require("../models/Conteudo")
const Conteudo = mongoose.model("conteudos")
const  multer   =  require ( 'multer' ) 


admin.use(express.static('public'))
//________________________Categorias_________________________//
admin.get('/addcategoria',(req,res)=>{
    res.render('blog/categoria', {headerAdminCat:true} )
})

admin.post('/categorias', (req, res)=>{
 
  
    var erros=[]

    if(!req.body.categoria || req.body.categoria == undefined || req.body.categoria == null){
        erros.push({texto:"nome Invalido"})
    }

    if(erros.length>0){
        res.render('blog/categoria', {headerAdminCat:true,  erros: erros})
    }else{
        let slug1 = slugify ('cadegoria-' + req.body.categoria)
        const novaCategoria = {

            categoria: req.body.categoria,
            slug:slug1 
        }
            
        new Categoria(novaCategoria).save().then(()=>{
            req.flash('success_msg', 'Categoria Criada com Sucesso')
            res.redirect("/admin/addcategoria")
        }).catch((err)=>{
            req.flash('error_msg', 'Erro ao criar Categoria')
            res.redirect('/admin/addcategoria')
        })
    }



})
//________________________Categorias_________________________//

//__________________________________________________________//


//________________________Conteudo_________________________//

admin.get('/addassunto', (req,res)=>{

    Categoria.find().then((categoria)=>{
        res.render("blog/HtmlForm", {headerAdminAssut:true, categoria: categoria.map(categoria => categoria.toJSON())})

    })
})

admin.post("/conteudo", (req,res)=>{
        

    const storage = multer.diskStorage({
        destination: function(req,file, cb){
        cb(null, `./public/imagem/`)
  
        },
        filename: function(req,file,cb){
          cb(null,file.originalname + Date.now() + '.jpg');
        }
      })
  const upload = multer({storage}).array("img",4);
  
  
  upload(req,res, function(err){
    if(err instanceof multer.MulterError){
      return res.status(500).send(err);
    }else if(err){
      return res.status(500).send(err)
    }
    let slug1 = slugify ('texto-' + req.body.titulo)
        const novaConteudo = {
            tituloCategoria: req.body.tituloCategoria,
            slug: slug1,
            categoria: req.body.categoria,
            titulo: req.body.titulo,
            subtitulo: req.body.subtitulo,
            texto1: req.body.TextoUm,
            exemplo1: req.body.exemplo1,
            imagem1: req.files[0].filename,
            texto2: req.body.TextoDois,
            nota: req.body.nota, 
            imagem2: req.files[1].filename,
            texto3: req.body.TextoTres,
            imagem3: req.files[2].filename,
            texto4: req.body.TextoQuatro,
            imagem4: req.files[3].filename,
            exemplo2: req.body.exemplo2,
            texto5: req.body.TextoQuinto,
            resumo: req.body.ResumoFinal,
            tag: req.body.tag,
            descricao: req.body.descricao,
            data: req.body.data,
        
        
        }
        new Conteudo(novaConteudo).save().then(()=>{
            req.flash("success_msg","Postagem criada com sucesso")
            res.redirect("/admin/addassunto")
        }).catch((err)=>{
            req.flash("error_msg","Erro ao criada postagem"  + err)
            res.redirect("/admin/addassunto")
        })
    
    })
    })
   
 
     

    



//________________________Conteudo_________________________//

admin.get('/:slug',(req,res)=>{
   
        Categoria.findOne({slug:req.params.slug}).lean().then((categoria)=>{
           
            if(categoria){
                
                Conteudo.find({tituloCategoria:categoria._id}).then((conteudo)=>{
                    res.render('blog/HtmlPage',{headerCategoria:true,conteudo: conteudo.map(conteudo => conteudo.toJSON()),categoria: categoria})
                })
            }
       })
    })

    




module.exports = admin

