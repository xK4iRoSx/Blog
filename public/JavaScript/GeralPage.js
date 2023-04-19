let $header =  document.querySelector('.header');

window.onscroll = () =>{

    if( window.scrollY > 0){
        $header.style.transition = ".5s"
        $header.style.boxShadow = "0 .3rem .5rem rgba(0, 50, 1, .500)"
        $header.style.background = "#000"
    }else{
        $header.style.transition = "none"
        $header.style.boxShadow = "none"
        $header.style.background = "none"
    }
}
