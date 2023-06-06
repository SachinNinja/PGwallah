burger=document.querySelector('.burger')
navlist=document.querySelector('.navlist')
navbar=document.querySelector('.navbar')

burger.addEventListener('click',()=>{
    navlist.classList.toggle('classresp');
    navlist.classList.toggle('hresp');

})

