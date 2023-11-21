import CreateBoard from "./createBoard.js";
import checkForWin, {checkForEmptyCell} from "./checkFor.js"
import { openDialog } from "./graphics.js";

export default function Controller(
    playerA = '@JosheP',
    playerB = '@HaYaTo'
) {
    const board = (function() {
        return CreateBoard();
    })()
   
    const players = [
        {
            name: playerA,
            marker: 'X',
            index: 0,
            cellMarkedOrder: [],
        },
        {
            name: playerB,
            marker: 'O',
            index: 1,
            cellMarkedOrder: [],
        }
    ]

    let activePlayer = players[0];

    const switchActivePlayer = () => { 
        activePlayer = (activePlayer === players[0]) ? players[1] : players[0]; 
    }

    const getActivePlayer = () => activePlayer;

    const markCell = (row, col) => {
        const cell = board.getBoard()[row][col];
        const cellMark = cell.getMark();
        const marker = activePlayer.marker;
        const markedHistory = activePlayer.cellMarkedOrder;
        
        if(cellMark) { return; }

        cell.setMark(marker);
        markedHistory.push(cell.getOrder());
        
        const result = checkForWin(markedHistory);

        const hasEmptyCell = checkForEmptyCell(board.getBoardWithMark());

        if(!hasEmptyCell) {
            openDialog(players, "It's a Draw!!!")
        }

        if(result) {
            openDialog(players, `${activePlayer.name} Has Won the Match!!`)
        }

        switchActivePlayer();
    }

    return {
        getActivePlayer,
        markCell,
    }
}