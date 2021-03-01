(() => {
   // Создаём поле с кнопкой "играть"
	function createElem() {
		const container = document.createElement('div');
		const block = document.createElement('div');
		const blockInner = document.createElement('div');
		const info = document.createElement('p');
		const inputNumber = document.createElement('input');
		const startBtn = document.createElement('button');

		info.textContent = 'Введите количество карточек по вертикали/горизонтали :';
		startBtn.textContent = 'Начать игру';

		container.classList.add('container');
		block.classList.add('block');
		blockInner.classList.add('block-inner')
		info.classList.add('info');
		inputNumber.classList.add('card-value', 'js-card-value');
		startBtn.classList.add('btn', 'js-btn');

		document.addEventListener('DOMContentLoaded', () => {
			document.body.append(container);
			container.append(block);
			block.append(blockInner);
			blockInner.append(info);
			blockInner.append(inputNumber);
			block.append(startBtn);
		});

		startBtn.addEventListener('click', () => {
			if (!((inputNumber.value > 1) && (inputNumber.value < 11) && (inputNumber.value % 2 === 0))) {
				inputNumber.value = 4;
			}
			blockInner.classList.add('hidden');
			startBtn.classList.add('hidden');
			createField(inputNumber.value);
			inputNumber.value = '';
		})
	}

    // Создаём игровое поле, заполняем ячейки
	function createField(value) {
		let amounElem = value * value;
		const block = document.querySelector('.block');
		const field = document.createElement('div');
		const WIDTH_FIELD = 300;
		const HEIGHT_FIELD = 300;
		let widthCell = WIDTH_FIELD / value; //ширина ячейки
		let heightCell = HEIGHT_FIELD / value; //высота ячейки

		field.classList.add('field');
		block.append(field);

		let numberArr = [];

		function generateArr() {
			for (let i = 1; i < amounElem / 2 + 1; i++) {
				numberArr.push(i);
				numberArr.push(i);
			}

			function shuffle(arr) {
				let j, temp;
				for (let i = arr.length - 1; i > 0; i--) {
					j = Math.floor(Math.random() * (i + 1));
					temp = arr[j];
					arr[j] = arr[i];
					arr[i] = temp;
				}
				return arr;
			}

			shuffle(numberArr);
		}

		generateArr();

		function fillCells() {
			for (let i = 0; i < amounElem; i++) {
				const cellElem = document.createElement('div');
				const cellInner = document.createElement('span');
				cellInner.textContent = numberArr[i];
				cellElem.classList.add('cell-elem', 'paint');
				cellInner.classList.add('hidden', 'js-span');
				cellElem.style.width = widthCell + 'px';
				cellElem.style.height = heightCell + 'px';
				field.append(cellElem);
				cellElem.append(cellInner);
			}
		}

		fillCells();
		startGame(amounElem);
	}

	function startGame(value) {
	let timerId	= setTimeout(finishGame, 60000, false);
		const field = document.querySelector('.field');
		let amountNumber = value / 2;
		let arrNumber = [];
		let arrElem = [];

		field.addEventListener('click', function (event) {
			let cellElem = event.target.closest('div');

			let cellInner = cellElem.querySelector('span');

			cellInner.classList.remove('hidden');
			cellElem.classList.remove('paint');
			arrElem.push(cellElem);
			arrNumber.push(cellElem.textContent);

			if (arrNumber.length === 2) {
				if (arrNumber[0] === arrNumber[1]) {
					arrElem = [];
					amountNumber--;
					if (amountNumber === 0) {
                        clearTimeout(timerId);
						finishGame(true);
					}
				} else {
					setTimeout(() => {				
						let span1 = arrElem[0].querySelector('span');
						let span2 = arrElem[1].querySelector('span');

						arrElem[0].classList.add('paint');
						arrElem[1].classList.add('paint');
						span1.classList.add('hidden');
						span2.classList.add('hidden');
						arrElem = [];
					}, 300);
				}
				arrNumber = [];
			}
		})
	}

	function finishGame(status) {
		const field = document.querySelector('.field');
		const block = document.querySelector('.block');
		const blockInner = document.querySelector('.block-inner');
		const startBtn = document.querySelector('.js-btn');
	
		field.remove();

		const againBtn = document.createElement('button');
		const endBlock = document.createElement('div');

		againBtn.textContent = 'Сыграть ещё раз';
    
		if (status) {
			endBlock.textContent = 'Вы выиграли';
		} else {
			endBlock.textContent = 'Вы проиграли. Минута прошла';
		}

		againBtn.classList.add('btn', 'again-btn');
		endBlock.classList.add('end-block');

		block.append(endBlock);
		block.append(againBtn);

		againBtn.addEventListener('click', () => {
			againBtn.remove();
			endBlock.remove();

			blockInner.classList.remove('hidden');
			startBtn.classList.remove('hidden');
		})
	}

	createElem();
})();
