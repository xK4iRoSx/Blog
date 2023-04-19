let $header =  document.querySelector('.header');
let $BoxLinksAssuntos = document.querySelector('.BoxLinksAssuntos');

window.onscroll = () =>{
    
    if( window.scrollY > 0){
        $header.style.transition = ".5s"
        $header.style.boxShadow = "0 .3rem .5rem rgba(0, 50, 1, .500)"
        $header.style.background = "#000"
        $BoxLinksAssuntos.style.background = "#000"
        
    }else{

        $header.style.transition = "none"
        $header.style.boxShadow = "none"
        $header.style.background = "none"
        $BoxLinksAssuntos.style.background = "none"
    }
}



let $ConteinerMobile = document.querySelector('.ConteinerMobile');
let bxmenu = document.querySelector('.bx-menu')
let bxx = document.querySelector('.bx-x')

function openMenu(){
    $ConteinerMobile.style.display = 'flex'
    bxx.style.display = 'flex'
    bxmenu.style.display = 'none'

}

function CloseMenu(){
    $ConteinerMobile.style.display = 'none'
    bxx.style.display = 'none'
    bxmenu.style.display = 'flex'
}


