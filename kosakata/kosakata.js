async function fetchData(x){
    try{
        const response = await fetch(x+".json");
        if(!response.ok){
            throw new Error("Network response was not ok")
        }
        const data = await response.json();
        return data;
    }catch (error){
        console.log("Error Loading JSON data : ",error)
        return null;
    }
}

async function getFetch(x){
    const data = await fetchData(x);
    if(data){
        return data;
    }
}
// getFetch('n5')
// async function fetchN5(){
//     try {
//         const response = await fetch("n5.json");
//         if (!response.ok) {
//             throw new Error("Network response was not ok");
//         }
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.log("Error Loading JSON data : ", error);
//         return null;
//     }
// }

// async function getN5() {
//     const n5 =  await fetchN5();
//     if(n5){
//         return n5
//     }
// }

async function show(...x){
    let number = 1
    for(let i = 0 ; i < x.length; i++){
        const show = await x[i]
        if(show){
            for(const romanLetter in show){
                const container = document.querySelector('.container')
                const content = document.createElement('div')
                const no = document.createElement('div')
                const japan = document.createElement('div')
                const sign = document.createElement('div')
                const mean = document.createElement('div')
                const h4 = document.createElement('h4')
                const h5 = document.createElement('h5')
                const p = document.createElement('p')
    
                japan.appendChild(h4)
                japan.appendChild(h5)
                mean.appendChild(p)
    
                content.classList.add('content')
                no.classList.add('no')
                japan.classList.add('japan')
                sign.classList.add('sign')
                mean.classList.add('mean')
    
                content.appendChild(no)
                content.appendChild(japan)
                content.appendChild(sign)
                content.appendChild(mean)
    
                no.innerHTML = number++ + '.&nbsp;&nbsp;'
                h4.innerHTML = show[romanLetter]['kanji']
                h5.innerHTML = romanLetter
                p.innerHTML = show[romanLetter]['arti']
                sign.innerHTML = '&nbsp;&nbsp;=&nbsp;&nbsp;'
                container.appendChild(content)
            }
        }

    }
    
}

const dropdown = document.body.querySelector('.dropdown')
const dropdown_content = document.body.querySelector('.dropdown-content')
dropdown.addEventListener('click',function(e){
    dropdown_content.classList.toggle('block')
    const container = document.querySelector('.container')
    const select = e.target.textContent
    const title = document.body.querySelector('.title')
    if(select == 'N5'){
        title.innerHTML = 'N5'
        container.innerHTML = ''
        show(getFetch('n5'))
    }
    else if(select == 'N4'){
        title.innerHTML = 'N4'
        container.innerHTML = ''
        show(getFetch('n4'))
    }
    else if(select == 'N3'){
        title.innerHTML = 'N3'
        container.innerHTML = ''
        show(getFetch('n3'))
    }
    else if(select == 'N2'){
        title.innerHTML = 'N2'
        container.innerHTML = ''
        show(getFetch('n2'))
    }
    else if(select == 'N1'){
        title.innerHTML = 'N1'
        container.innerHTML = ''
        show(getFetch('n1'))
    }
    else if(select == 'Semua'){
        title.innerHTML = 'Semua'
        container.innerHTML = ''
        show(getFetch('n5'),getFetch('n4'),getFetch('n3'),getFetch('n2'),getFetch('n1'))
    }
})
show(getFetch('n5'),getFetch('n4'),getFetch('n3'),getFetch('n2'),getFetch('n1'))


let node_card;
let box_arrow;
let modal_box_change;
let modal_box_kanji;
let modal_box_roman;
let modal_box_mean;
const next_arrow = document.body.querySelector('.right-arrow')
const previous_arrow = document.body.querySelector('.left-arrow')


const container = document.body.querySelector('.container')
container.addEventListener('click',function(e){
    if(e.target.closest('.content')){
        let target = e.target;

        while (target && !target.classList.contains('content')) {
            target = target.parentElement;
        }

        if (target && target.classList.contains('content')) {
            // console.log(target);
            const kanji = target.children[1].firstChild.textContent
            const roman = target.children[1].children[1].textContent
            const mean = target.children[3].firstChild.textContent
            
            const modal = document.body.querySelector('.modal')
            modal_box_change = document.body.querySelector('.modal-box')
            modal_box_kanji = modal_box_change.querySelector('.top')
            modal_box_roman = modal_box_change.querySelector('.middle')
            modal_box_mean = modal_box_change.querySelector('.bottom')
            const modal_arrow = document.body.querySelector('.modal-arrow')

            modal_box_kanji.firstElementChild.innerHTML = kanji
            modal_box_roman.firstElementChild.innerHTML = roman
            modal_box_mean.firstElementChild.innerHTML = mean

            modal_box_change.style.display = 'block';
            modal.classList.add('modal-active')
            document.body.classList.add('inactive-body')
            modal.style.zIndex = 1000;
            modal_arrow.style.display = 'block';

            node_card = target
            box_arrow = node_card

            if(box_arrow.nextElementSibling == null){
                next_arrow.classList.add('inactive-arrow')
                previous_arrow.classList.remove('inactive-arrow')
            }else if(box_arrow.previousElementSibling == null){
                previous_arrow.classList.add('inactive-arrow')
                next_arrow.classList.remove('inactive-arrow')
            }else{
                next_arrow.classList.remove('inactive-arrow')
                previous_arrow.classList.remove('inactive-arrow')
            }
        }
    }
})

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

// next arrow
next_arrow.addEventListener('click',()=>{
    if(box_arrow.nextElementSibling !== null){
        box_arrow = box_arrow.nextElementSibling
        // console.log(box_arrow)
        const kanji = box_arrow.children[1].firstElementChild.textContent
        const roman = box_arrow.children[1].children[1].textContent
        const mean = box_arrow.children[3].firstElementChild.textContent
        modal_box_kanji.firstElementChild.innerHTML = kanji
        modal_box_roman.firstElementChild.innerHTML = roman
        modal_box_mean.firstElementChild.innerHTML = mean

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
        const kanji = box_arrow.children[1].firstElementChild.textContent
        const roman = box_arrow.children[1].children[1].textContent
        const mean = box_arrow.children[3].firstElementChild.textContent
        modal_box_kanji.firstElementChild.innerHTML = kanji
        modal_box_roman.firstElementChild.innerHTML = roman
        modal_box_mean.firstElementChild.innerHTML = mean

        next_arrow.classList.remove('inactive-arrow')
    }if(box_arrow.previousElementSibling == null){
        previous_arrow.classList.add('inactive-arrow')
    }
})