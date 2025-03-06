const DOM = {
	cellArray: document.querySelectorAll('.gridCell'),
	cellContentArray: document.querySelectorAll('.gridCell p'),
	overlay: document.querySelector('.overlay'),
	overlayMsg: document.querySelector('.overlay h1'),
	okayBtn: document.querySelector('.okay'),
	resetBtn: document.querySelector('.reset'),
	xWins: document.querySelector('#xWins'),
	oWins: document.querySelector('#oWins'),
	xDisplay: document.querySelector('#xNameDisplay'),
	oDisplay: document.querySelector('#oNameDisplay'),
	xPlayerName: document.querySelector('#xPlayerName'),
	oPlayerName: document.querySelector('#oPlayerName'),
	xTurnIndicator: document.querySelector('.xTurnIndicator'),
	oTurnIndicator: document.querySelector('.oTurnIndicator'),
	xChangeName: document.querySelector('#xPlayerChangeName'),
	oChangeName: document.querySelector('#oPlayerChangeName'),
}

export default DOM;
