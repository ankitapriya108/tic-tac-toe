import React, { useState, useEffect } from 'react';
import './style.css';
import Tic2 from './assets/tic2.png';

const TicTac = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [next, setNext] = useState(true);
    const [gameStarted, setGameStarted] = useState(false);
    const [time, setTime] = useState(0);
    const [winner, setWinner] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const handleClick = (i) => {
        const newBoard = [...board];
        if (newBoard[i] || calculateWinner(newBoard)) {
            return;
        }
        newBoard[i] = next ? 'X' : 'O';
        setBoard(newBoard);
        setNext(!next);

        const calculateWinnerResult = calculateWinner(newBoard);
        if (calculateWinnerResult) {
            setWinner(calculateWinnerResult);
            setGameOver(true); 
        }
    };

    useEffect(() => {
        let interval;
        if (gameStarted && !winner) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        }
        return () => {
            clearInterval(interval);
        };
    }, [gameStarted, winner]);

    return (
        <>
            <div className='wrapper'>
                <div className='game'>
                    <img src={Tic2} alt='' />
                    <div className='game-box'>
                        <div className='time'>
                            <h3>Time taken: {time} sec.</h3>
                        </div>
                        <div className='full-board'>
                            <div className='board'>
                                <div className='box' onClick={() =>
                                     handleClick(0)}>{board[0]}
                                     </div>
                                <div className='box' onClick={() =>
                                     handleClick(1)}>{board[1]}
                                     </div>
                                <div className='box' onClick={() =>
                                     handleClick(2)}>{board[2]}
                                     </div>
                            </div>
                            <div className='board'>
                                <div className='box' onClick={() =>
                                     handleClick(3)}>{board[3]}
                                     </div>
                                <div className='box' onClick={() =>
                                     handleClick(4)}>{board[4]}
                                     </div>
                                <div className='box' onClick={() => 
                                    handleClick(5)}>{board[5]}
                                    </div>
                            </div>
                            <div className='board'>
                                <div className='box' onClick={() => 
                                    handleClick(6)}>{board[6]}
                                    </div>
                                <div className='box' onClick={() =>
                                     handleClick(7)}>{board[7]}
                                     </div>
                                <div className='box' onClick={() =>
                                     handleClick(8)}>{board[8]}
                                     </div>
                            </div>
                        </div>
                       
                        <div className='winner'>
                            <h3>Winner:{winner}</h3>
                        </div>
                    </div>
                    {!gameStarted && (
                        <div className='start'>
                            <button onClick={() => setGameStarted(true)}>Start Game</button>
                        </div>
                    )}
                     {gameOver && (
                            <div className='game-over'>
                                <h3>Game Over</h3>
                            </div>
                        )}
                </div>
            </div>
        </>
    );
};

const calculateWinner = (squares) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
};

export default TicTac;


