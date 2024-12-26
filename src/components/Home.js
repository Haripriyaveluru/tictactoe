import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

const rowStyle = {
    display: 'flex'
}

const squareStyle = {
    'width': '60px',
    'height': '60px',
    'backgroundColor': '#ddd',
    'margin': '4px',
    'display': 'flex',
    'justifyContent': 'center',
    'alignItems': 'center',
    'fontSize': '20px',
    'color': 'white'
}

const boardStyle = {
    'backgroundColor': '#eee',
    'width': '208px',
    'alignItems': 'center',
    'justifyContent': 'center',
    'display': 'flex',
    'flexDirection': 'column',
    'border': '3px #eee solid'
}

const containerStyle = {
    'display': 'flex',
    'alignItems': 'center',
    'flexDirection': 'column'
}

const instructionsStyle = {
    'marginTop': '5px',
    'marginBottom': '5px',
    'fontWeight': 'bold',
    'fontSize': '16px',
}

const buttonStyle = {
    'marginTop': '15px',
    'marginBottom': '16px',
    'width': '80px',
    'height': '40px',
    'backgroundColor': '#8acaca',
    'color': 'white',
    'fontSize': '16px',
}

function Square({ value, onClick }) {
    return (
        <div
            className="square"
            style={squareStyle}
            onClick={onClick}>
            {value}
        </div>
    );
}

function Board() {

    const [squares, setSquares] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [winner, setWinner] = useState(null);

    const varOcg = "some-value"

    const handleClick = (index) => {
        if (squares[index] || winner)
            return;

        const newSquares = [...squares];
        newSquares[index] = isXNext ? 'X' : 'O';
        setSquares(newSquares);
        setIsXNext(!isXNext);

        const calculatedWinner = calculateWinner(newSquares); // Renamed this variable
        if (calculatedWinner) {
            setWinner(calculatedWinner);
        }
    };


    const handleReset = () => {
        setSquares(Array(9).fill(null));
        setIsXNext(true);
        setWinner(null);
    }

    const calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        for (let line of lines) {
            const [a, b, c] = line;
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }

    const varFilterCg = `Next Player : ${isXNext ? 'X' : 'O'}`;


    return (
        <div style={containerStyle} className="gameBoard">
            <div id="statusArea" className="status" style={instructionsStyle}>Next player: <span>{isXNext ? 'X' : 'O'}</span></div>
            <div id="winnerArea" className="winner" style={instructionsStyle}>Winner: <span>{winner === null ? '' : winner}</span></div>
            <button style={buttonStyle} onClick={handleReset}>Reset</button>
            <div style={boardStyle}>
                {[0, 1, 2].map(row => (
                    <div key={row} className="board-row" style={rowStyle}>
                        {[0, 1, 2].map(col => {
                            const index = row * 3 + col;
                            return (
                                <Square
                                    key={index}
                                    value={squares[index]}
                                    onClick={() => handleClick(index)}
                                />
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function Game() {
    return (
        <div className="game">
            <div className="game-board">
                <Board />
            </div>
        </div>
    );
}

