export default function extractColAndRow(numb){
    const row = Math.floor(numb / 3);
    const col = numb % 3;
    return {row, col}
}