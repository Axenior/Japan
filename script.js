// Modal box
// close modal box
const modal = document.body.querySelector('.modal')
const modal_box = document.body.querySelector('.modal-box')
const x_icon = document.body.querySelector('.x-icon')
const modal_arrow = document.body.querySelector('.modal-arrow')
x_icon.addEventListener('click',function(){
    modal_box.style.display = 'none';
    modal.classList.remove('modal-active')
    document.body.classList.remove('inactive-body')
    modal.style.zIndex = -1000;
    modal_arrow.style.display = 'none';
})

// change card
let node_kana;
let box_arrow;
let modal_box_kana;
let modal_box_roman;
let modal_box_change;

const next_arrow = document.body.querySelector('.right-arrow')
const previous_arrow = document.body.querySelector('.left-arrow')

// next arrow
next_arrow.addEventListener('click',()=>{
    if(box_arrow.nextElementSibling !== null){
        box_arrow = box_arrow.nextElementSibling
        //  console.log(box_arrow)
        const kana = box_arrow.children[0].firstElementChild.textContent
        const roman = box_arrow.children[1].firstElementChild.textContent
          
        modal_box_kana.firstElementChild.innerHTML = kana
        modal_box_roman.firstElementChild.innerHTML = roman

        previous_arrow.classList.remove('inactive-arrow')
    }if(box_arrow.nextElementSibling == null){
        next_arrow.classList.add('inactive-arrow')
    }
})

// previous arrow
previous_arrow.addEventListener('click',()=>{
    // console.log(box_arrow.previousElementSibling)
    if(box_arrow.previousElementSibling !== null){
        box_arrow = box_arrow.previousElementSibling
        // console.log(box_arrow)
        const kana = box_arrow.children[0].firstElementChild.textContent
        const roman = box_arrow.children[1].firstElementChild.textContent
        
        modal_box_kana.firstElementChild.innerHTML = kana
        modal_box_roman.firstElementChild.innerHTML = roman

        next_arrow.classList.remove('inactive-arrow')
    }if(box_arrow.previousElementSibling == null){
        previous_arrow.classList.add('inactive-arrow')
    }
})