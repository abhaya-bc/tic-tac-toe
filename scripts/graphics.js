import Controller from "./controller.js";
import insertSvg from "./insertSvgs.js";
import extractColAndRow from "./extractColAndRow.js";

const domElmnt = {
    board: document.querySelector('div.board'),
    items: document.querySelectorAll('div.item'),
    btn: document.querySelector('button'),
    dialog: {
        container: document.querySelector('dialog'),
        btn: document.querySelector('dialog button'),
        inputs: document.querySelectorAll('dialog input'),
        desc: document.querySelector('dialog p.description'),
        preview: document.querySelector('dialog .shortSnip'),
        close() {
            this.container.close()
        },
        open() {
            this.container.showModal()
        },

    }
}

domElmnt.btn.addEventListener('click', startGame);
domElmnt.board.addEventListener('click', startGame);

function startGame() {
    console.log('Game has Started')
    domElmnt.board.removeEventListener('click', startGame);

    const thisGame = (function(){
        return Controller();
    })()

    console.log(thisGame)

    domElmnt.items.forEach( (item, index) => {
        item.innerHTML = '';
        item.addEventListener('click', function itemsFunc(e) {
            const activePlayer = thisGame.getActivePlayer();
            if(item.innerHTML !== '') {return;}
            insertSvg(e.target, activePlayer.index);
            const {row, col} = extractColAndRow(index);
            setTimeout(function() {
                    thisGame.markCell(row, col);
                }, 100)
            item.removeEventListener('click', itemsFunc);
        })
    });
}

export function openDialog(players, msg='') {
    domElmnt.dialog.open()
    domElmnt.dialog.btn.addEventListener('click', ()=> {
        domElmnt.dialog.close()
        startGame()
    })

    domElmnt.dialog.inputs.forEach((input, i) => {
        input.value = players[i].name;
    })

    domElmnt.dialog.desc.innerText = msg;    
}