import './styles.css'
import DOM from './DOM';

const gameBoard = (() => {
	const gameState = ['', '', '', '', '', '', '', '', '',];
	const gameReset = () => {
		gameStateReset(gameState);
		xPlayer.winCount = 0;
		xPlayer.turnCount = 0;
		oPlayer.winCount = 0;
		oPlayer.turnCount = 0;
		displayController.updateBoard(gameState);
		displayController.updateWinCount();
	};

	const determinePlayer = () => {
		if (xPlayer.turnCount <= oPlayer.turnCount) {
			++xPlayer.turnCount
			DOM.xTurnIndicator.classList.remove('go');
			DOM.xTurnIndicator.classList.add('stop');
			DOM.oTurnIndicator.classList.remove('stop');
			DOM.oTurnIndicator.classList.add('go');
			return xPlayer.boardMark;
		}
		else if (oPlayer.turnCount < xPlayer.turnCount) {
			++oPlayer.turnCount
			DOM.oTurnIndicator.classList.remove('go');
			DOM.oTurnIndicator.classList.add('stop');
			DOM.xTurnIndicator.classList.remove('stop');
			DOM.xTurnIndicator.classList.add('go');
			return oPlayer.boardMark;
		};
	};

	const gameStateReset = (x) => {
		for (let i = x.length - 1; i >= 0; --i) {
			x[i] = '';
		};
	};

	const winCheck = () => {
		const winCombos = [
			[gameState[0], gameState[1], gameState[2]],
			[gameState[3], gameState[4], gameState[5]],
			[gameState[6], gameState[7], gameState[8]],
			[gameState[0], gameState[3], gameState[6]],
			[gameState[1], gameState[4], gameState[7]],
			[gameState[2], gameState[5], gameState[8]],
			[gameState[0], gameState[4], gameState[8]],
			[gameState[2], gameState[4], gameState[6]]
		]

		winCombos.forEach((x) => {
			if (x.join('') == 'xxx') {
				++xPlayer.winCount;
				gameStateReset(gameState);
				displayController.winMessage(xPlayer.playerName);
			}
			else if (x.join('') == 'ooo') {
				++oPlayer.winCount;
				displayController.winMessage(oPlayer.playerName);
				(gameStateReset(gameState));
			};
		});

		if (gameState.every((x) => { return x !== ''; }) == true) {
			displayController.winMessage('tie');
			gameStateReset(gameState);
		}
	};

	DOM.cellArray.forEach((cell) => {
		cell.addEventListener('click', () => {
			let cellNumber = cell.getAttribute('data-cell-number') - 1;
			if (gameState[cellNumber] !== '') {
				return;
			};
			gameState[cellNumber] = `${determinePlayer()}`;
			winCheck();
			displayController.updateWinCount();
			displayController.updateBoard(gameBoard.gameState)
		});
	});

	return { gameState, gameReset };
})();

const displayController = (() => {
	const updateBoard = (x) => {
		for (let [i, index] = [x.length, 0]; i > 0; --i, ++index) {
			DOM.cellContentArray[index].textContent = `${x[index]}`;
		};
	}

	const updateWinCount = () => {
		DOM.xWins.textContent = `WINS: ${xPlayer.winCount}`;
		DOM.oWins.textContent = `WINS: ${oPlayer.winCount}`;
	};

	const winMessage = (x) => {
		DOM.overlay.style.visibility = 'visible';
		if (x == 'tie') {
			DOM.overlayMsg.textContent = 'its a tie.'
		}
		else if (x !== 'tie') {
			DOM.overlayMsg.textContent = `${x} has won!`;
		}
		const okayButton = document.querySelector('.okay');
		okayButton.addEventListener('click', () => {
			DOM.overlay.style.visibility = 'hidden';
		})
	}

	const updatePlayerName = (input, player) => {
		player.playerName = input.value;
		if (player == xPlayer) {
			DOM.xDisplay.textContent = `X - ${player.playerName}`;
		}
		else if (player == oPlayer) {
			DOM.oDisplay.textContent = `O - ${player.playerName}`;
		};
		input.value = '';
	};

	return {
		updateBoard,
		updateWinCount,
		updatePlayerName,
		winMessage
	};
})();

const PlayerFactory = (boardMark, name) => {
	let turnCount = 0;
	let winCount = 0;
	let playerName = name;
	return { boardMark, turnCount, winCount, playerName, };
};

const xPlayer = PlayerFactory('x', 'X PLAYER');
const oPlayer = PlayerFactory('o', 'O PLAYER');

DOM.resetBtn.addEventListener('click', gameBoard.gameReset);
DOM.xChangeName.addEventListener('click', () => {
	displayController.updatePlayerName(DOM.xPlayerName, xPlayer)
})
DOM.oChangeName.addEventListener('click', () => {
	displayController.updatePlayerName(DOM.oPlayerName, oPlayer)
})
