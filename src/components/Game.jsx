import React, { useCallback, useEffect, useRef } from "react";
import gameCss from './Game.module.css'
import { useState } from "react";


const Box = ({ count, dataX, dataY, clickedCount, setClickedCount, data, setData }) => {

    const changedMatrixValue = (x, y, value) => {
        const arr = matrix(count);
        for (let i = 0; i < count; i++) {
            for (let j = 0; j < count; j++) {
                if (i === x && j === y) {
                    arr[i][j] = value;
                } else {
                    arr[i][j] = data[i][j];
                }
            }
        }
        return arr;
    }

    const onBoxClick = (e) => {
        if (!e.target.innerText) {
            e.target.innerText = clickedCount % 2 ? 'O' : 'X'
            setClickedCount(clickedCount + 1);
            setData(changedMatrixValue(dataX, dataY, clickedCount % 2 ? 0 : 1));
        }
    };
    return (
        <div
            className={gameCss.boxSpace}
            onClick={(e) => onBoxClick(e)}
            data-x={dataX}
            data-y={dataY}
        />
    );
}



const Row = ({ count, ...rest }) => {
    return (
        <div className={gameCss.row}>
            {[...Array(count).keys()].map(el => {
                const dataY = el % count;
                return <Box key={el} dataY={dataY} {...rest} count={count} />
            })}
        </div>
    )
}

const Game = ({ count }) => {
    const [clickedCount, setClickedCount] = useState(0);
    const [data, setData] = useState(matrix(count));
    // console.log(data)
    
    function refreshPage() {
        window.location.reload(false);
    }

    useEffect(() => {
        if (clickedCount >= 2 * count - 1) {
            const diagonalLine = [];
            const revertedDiagonalLine = [];
            for (let i = 0; i < count; i++) {
                if (data[i].every((val, j, arr) => arr[0] !== null && val === arr[0])) {
                    alert('win');
                    refreshPage();
                } else if (data.every((val, j, arr) => arr[0][i] !== null && val[i] === arr[0][i])) {
                    alert('win');
                    refreshPage();
                } 

                for (let j = 0; j < count; j++) {
                    if (i === j) {
                        diagonalLine.push(data[i][j])
                    }
                    if (j === count - 1 - i) {
                        revertedDiagonalLine.push(data[i][j])
                    }
                }
            }
            if (diagonalLine.every((val, j, arr) => arr[0] && val === arr[0])) {
                alert('win');
                refreshPage();
            }

            if (revertedDiagonalLine.every((val, j, arr) => arr[0] && val === arr[0])) {
                alert('win');
                refreshPage();
            }
            if(clickedCount==count*count){
                alert('play again');
                refreshPage();
            }
        }
        
    }, [clickedCount]);

    const generateNodes = () => [...Array(count).keys()]
        .map(el =>
            <Row
                data={data}
                setData={setData}
                key={el}
                count={count}
                dataX={el}
                clickedCount={clickedCount}
                setClickedCount={setClickedCount}
            />
        );

    return (
        <div className={gameCss.gameSpace}>
            {generateNodes()}
        </div>
    );
}

export default Game;

function matrix(n) {
    var result = []
    for (var i = 0; i < n; i++) {
        result.push(new Array(n).fill(null))
    }
    return result
}