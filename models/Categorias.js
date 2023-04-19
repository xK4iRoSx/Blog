const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Categoria = new Schema({
    categoria:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true
    },
   
})

mongoose.model('categorias', Categoria)