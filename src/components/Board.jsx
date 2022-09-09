import React, { useState } from "react";
import boardCss from './Board.module.css';

const Board = ({value, onChange}) => {
    return (
        <form className={boardCss.formCss}>
            <label>
                Enter Number : 
                <input type="text" name="name" value={value} onChange={onChange} />
            </label>
        </form>
    );
} 

export default Board;