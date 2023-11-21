import { openDialog } from "./graphics.js";

const winCombi = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
]

export default function checkForWin(arr) {

    let hasWon = false;

    if(arr.length < 2) {
        return hasWon;
    }

    winCombi.forEach((combi)=>{
        const matches = combi.filter((itm) => {
            for(let i = 0; i < arr.length; i++) {
                if(arr[i] === itm)  {
                    return true;
                }
            }
        })
        if (matches.length === 3) {
           hasWon = matchConfirmation(matches);
        }
    })

    return hasWon;

}

function matchConfirmation(match) {
    let confirm = false;
    winCombi.forEach((combi) => {
        if(combi.toString() == match.toString()) {
            confirm = true;
        }
    })
    return confirm
}

export function checkForEmptyCell(boardWithMark) {
    let emptyCell = []
    boardWithMark.map(row => {
       row.map(cell => {
            if(!cell) {
                emptyCell.push(cell)
            }
        })
    })

    if (emptyCell.length < 1) {
        return false;
    }

    return true;
}