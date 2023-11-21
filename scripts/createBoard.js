function Cell() {
    let mark = '';
    let order = 0;

    const getMark = () => mark;
    const getOrder = () => order;

    const setMark = (marker) => {
        mark = marker;
    }

    const setOrder = (odr) => {
        order = odr;
    }

    return {
        getMark,
        setMark,
        getOrder,
        setOrder
    }
}


export default function CreateBoard() {
    let board = (
        function(row, col) {
            const grid = [];
            for(let i = 0; i < row; i++) {
                grid[i] = [];
                for(let j = 0; j < col; j++) {
                    grid[i].push(Cell())
                    grid[i][j].setOrder((i*3)+(j+1));
                    delete grid[i][j].setOrder
                }
            }
            return grid;
        }
    )(3,3)

    const getBoard = () => board;

    const getBoardWithMark = () => { 
        return board.map((row)=>{
        return row.map((cell) => {
            return cell.getMark();
        })
    })
    }

    const getBoardWithOrder = () => {
        return board.map((row) => {
            return row.map((cell) => {
                return cell.getOrder();
            })
        })
    }

    return {
        getBoard,
        getBoardWithMark,
        getBoardWithOrder,
    }
}