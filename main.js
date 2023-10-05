const Board = (() => {

    const gameBoard = ["-", "-", "-",
                       "-", "-", "-",
                       "-", "-", "-"];
    //Drawing gameBoard
    const drawGameBoard = () => {
        for(i = 1; i <= gameBoard.length; i ++)
        {
            console.log(gameBoard[i - 1])
            if (i % 3 == 0)
            {
                console.log("\n");
            }
        }
    };

    const getGameBoard = () => gameBoard;

    const gameBoardFull = () => {
        for (let i = 0; i < gameBoard.length; i++)
        {
            if (gameBoard[i] == "-") return false;
        }
        return true;
    }

    const checkTile = (number) =>{
        return gameBoard[number] === "-" ? true : false;
    }

    const setGameBoard = (player, number) => { 
        gameBoard[number] = player.token
        if (player.token == "X") {document.getElementById(`tile${number}`).src ='./img/token1.png';
        }else{
            document.getElementById(`tile${number}`).src ='./img/token2.png';}
            
    }

    const resetGameBoard = () => {
        for(i = 0; i < gameBoard.length; i ++)
        {
            gameBoard[i] = "-";
            document.getElementById(`tile${i}`).src='';
        }
    }
    
    return { drawGameBoard, checkTile, setGameBoard, getGameBoard, resetGameBoard, gameBoardFull };
})();


const playerFactory = (name, token) => {
    return { name, token }
};

const refreshFrontEnd = () => {
    for (let i = 0; i < Board.getGameBoard().length; i++)
    {
        document.getElementById(`tile${i}`).addEventListener('click', () =>{
            displayController.playRound(`${i}`);
        });
    }
}

const blankFrontEnd = () => {
    for (let i = 0; i < Board.getGameBoard().length; i++)
    {
        document.getElementById(`tile${i}`).src="./img/whiteTile.png"
    }
}

const displayController = (() => {
    
    let player1 = playerFactory(prompt("Enter your Name: "), "X");
    let player2 = playerFactory(prompt("Enter your Name: "), "O");
    
    if (player1.name == "" || player1.name == null) player1.name = "Player 1";
    if (player2.name == "" || player2.name == null) player2.name = "Player 2";

    document.getElementById('player1').innerText = player1.name;
    document.getElementById('player2').innerText = player2.name;
    document.getElementById('token1').innerText = player1.token;
    document.getElementById('token2').innerText = player2.token;

    blankFrontEnd();
    refreshFrontEnd();

    //Should've used instance and function instead of IIFE because of security issues (scope related)
    //let gameBoard = Board;

    //Select players name
    /*const selectPlayers = (name1 = "Player 1", name2 = "Player 2") => {
        player1 = playerFactory(name1, "X");
        player2 = playerFactory(name2, "O");
    };
        
    selectPlayers();*/


    let turn = 0;
    let activePlayer = player1;

    const swapTurns = () => { 
        activePlayer.name === player1.name ?  activePlayer = player2 : activePlayer = player1; 
    };

    const placeToken = (player, boardCell) => {
        return Board.checkTile(boardCell) ? Board.setGameBoard(player, boardCell) : false;
    };

    const playRound = (tile) => {
        //Backend check for not selected players
        /*if (Object.keys(player1).length === 0 || Object.keys(player2) === 0)
        {
            selectPlayers();
        }*/

        if (placeToken(activePlayer, tile) == false) { return };
        if (checkHorizontal(activePlayer)){return endGame();}
        if (checkVertical(activePlayer)){return endGame();}
        if (checkDiagonal(activePlayer)){return endGame();}
        if (Board.gameBoardFull()) {return alert("It's a tie!")}
        console.log(Board.getGameBoard());

        turn+=1;
        swapTurns();
        console.log("CURRENT PLAYER TURN: ", activePlayer, turn);

    };

    const checkDiagonal = (activePlayer) => {
        let board = Board.getGameBoard();
        if (board[0] == activePlayer.token && board[4] == activePlayer.token && board[8] == activePlayer.token)
        {
            return true;
        }
        else if (board[6] == activePlayer.token && board[4] == activePlayer.token && board[2] == activePlayer.token)
        {
            return true;
        }
        return false;
    };

    const checkHorizontal = (activePlayer) => {
        let board = Board.getGameBoard();
        if (board[0] == activePlayer.token && board[1] == activePlayer.token && board[2] == activePlayer.token)
        {
            return true;
        }
        else if (board[3] == activePlayer.token && board[4] == activePlayer.token && board[5] == activePlayer.token)
        {
            return true;
        }
        else if (board[6] == activePlayer.token && board[7] == activePlayer.token && board[8] == activePlayer.token)
        {
            return true;
        }
        return false;
    };

    const checkVertical = (activePlayer) => {
        let board = Board.getGameBoard();
        if (board[0] == activePlayer.token && board[3] == activePlayer.token && board[6] == activePlayer.token)
        {
            return true;
        }
        else if (board[1] == activePlayer.token && board[4] == activePlayer.token && board[7] == activePlayer.token)
        {
            return true;
        }
        else if (board[2] == activePlayer.token && board[5] == activePlayer.token && board[8] == activePlayer.token)
        {
            return true;
        }
        return false;
    };

    const endGame = () => {
        alert("winner is: " + activePlayer.name);

    };

    const resetGame = () => {
        turn = 0;
        Board.resetGameBoard();
        activePlayer = player1;
        blankFrontEnd();
        refreshFrontEnd();
    }

    return { playRound , resetGame }

})();



const start = document.getElementById('start');
const reset = document.getElementById('reset');

const tile0 = document.getElementById('tile0');
const tile1 = document.getElementById('tile1');
const tile2 = document.getElementById('tile2');
const tile3 = document.getElementById('tile3');
const tile4 = document.getElementById('tile4');
const tile5 = document.getElementById('tile5');
const tile6 = document.getElementById('tile6');
const tile7 = document.getElementById('tile7');
const tile8 = document.getElementById('tile8');


start.addEventListener('click', ()=>{
    window.location.reload();
});
reset.addEventListener('click', displayController.resetGame);





/*
const gameBoard = ["-", "-", "-",
                   "-", "-", "-",
                   "-", "-", "-"];
*/



