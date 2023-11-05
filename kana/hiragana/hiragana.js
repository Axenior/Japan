async function fetchHiragana(){
    try {
        const response = await fetch("../kana.json");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error Loading JSON data : ", error);
        return null;
    }
}

async function getHiragana() {
    const hiragana = await fetchHiragana();
    if(hiragana){
        for(const romanLetter in hiragana){
            const container = document.querySelector('.container')
            const box = document.createElement('div')
            box.classList.add('box')
            const box_top = document.createElement('div')
            box_top.classList.add('top')
            const box_bottom = document.createElement('div')
            box_bottom.classList.add('bottom')
            const h1 = document.createElement('h1')
            h1.classList.add('kana')
            const p = document.createElement('p')

            box_top.appendChild(h1)
            box_bottom.appendChild(p)
            box.appendChild(box_top)
            box.appendChild(box_bottom)
            h1.innerHTML = hiragana[romanLetter]['hiragana']
            p.innerHTML = romanLetter
            container.appendChild(box)
        }
        
        const container = document.querySelector('.container')
        container.addEventListener('click',function(e){
        if(e.target.className == 'kana'){
            const kana = e.target.textContent
            const roman = e.target.parentElement.nextSibling.firstChild.textContent
            const modal = document.body.querySelector('.modal')
            modal_box_change = document.body.querySelector('.modal-box')
            modal_box_kana = modal_box_change.querySelector('.top')
            modal_box_roman = modal_box_change.querySelector('.bottom')
            const modal_arrow = document.body.querySelector('.modal-arrow')
            modal_box_kana.firstElementChild.innerHTML = kana
            modal_box_roman.firstElementChild.innerHTML = roman
            modal_box_change.style.display = 'block';
            modal.classList.add('modal-active')
            document.body.classList.add('inactive-body')
            modal.style.zIndex = 1000;
            modal_arrow.style.display = 'block';
            
            node_kana = e.target
            // console.log(node_kana)
            box_arrow = node_kana.parentElement.parentElement
            // console.log(box_arrow)

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
        })
    }
}

getHiragana()

