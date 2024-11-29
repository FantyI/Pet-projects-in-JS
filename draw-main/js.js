

let btCreateGrid = document.querySelector('.CreateGrid');
let btClearGrid = document.querySelector('.ClearGrid');
let btErase = document.querySelector('.Erase');
let btPaint = document.querySelector('.Paint');

let conteiner = document.querySelector('.conteiner');

let widthRange = document.getElementById('width-range');
let heightRange = document.getElementById('height-range');

let counterWidth = document.querySelector(".counterWidth")
let counterHeight = document.querySelector(".counterHeight")

let color = document.getElementById('color');



let listMous = {
    down: 'mousedown',
    move: 'mousemove',
    up: 'mouseup'
}

let draw = false;
let erase = false;

widthRange.value = 0;
heightRange.value = 0;

btCreateGrid.addEventListener('click', () => {
    conteiner.innerHTML = '';

    let count = 0;
    for (let i = 0; i < widthRange.value; i++) {
        count += 2;
        let row = document.createElement('div');
        row.classList.add('row');


        for (let j = 0; j < heightRange.value; j++) {
            count += 2;

            let col = document.createElement('div');
            col.classList.add('col');
            col.setAttribute('id', `col-${count}`);

            col.addEventListener(listMous.down, () => {
                draw = true;

                if (!erase) {
                    col.style.backgroundColor = color.value;
                }
                else {
                    col.style.backgroundColor = 'transparent';
                }
            })

            col.addEventListener(listMous.move, (e) => {
                // let data = {
                //     data1: e.clientX,
                //     data2: e.clientY,
                // }
                if (draw) {
                    let elementId = document.elementFromPoint(
                        e.clientX,
                        e.clientY,
                    ).id;
                    checker(elementId);
                }

            })

            col.addEventListener(listMous.up, () => {
                draw = false;

            })

            row.append(col);
        }

        conteiner.append(row);
    }
})

function checker(elementId) {

    let arrCol = document.querySelectorAll('.col');

    arrCol.forEach(element => {
        if (!erase && element.id === elementId) {
            element.style.backgroundColor = color.value;
        }
        else if(erase && element.id === elementId) {
            element.style.backgroundColor = 'white';
        }
    })
}

btErase.addEventListener('click', () => {
    erase = true;
})

btPaint.addEventListener('click', () => {
    erase = false;
})

btClearGrid.addEventListener('click', () => {
    conteiner.innerHTML = "";
})

heightRange.addEventListener('input', () => {
    counterHeight.innerHTML = heightRange.value;
})

widthRange.addEventListener('input', () => {
    counterWidth.innerHTML = widthRange.value;
})