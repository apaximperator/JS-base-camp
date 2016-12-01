var arr = [], box, ei, ej;
/*
 * swap
 *
 */
function swap(arr, i1, j1, i2, j2) {
  t = arr[i1][j1];
  arr[i1][j1] = arr[i2][j2];
  arr[i2][j2] = t;
}
/*
 * onload запуск игры
 *
 */
window.onload = function() {
  box = document.getElementById("box");
  restoreGame();
  newGame();
  document.getElementById("reset").onclick = newGame;
};
/*
 * saveGame
 */
function saveGame() { //сохраняем масив и координаты пустой клетки в localStorage с ключом 'prevGame'
  window.localStorage.setItem('prevGame', JSON.stringify({ 
    arr: arr,
    ei: ei,
    ej: ej
  }));
}
/*
 * restoreGame
 */
function restoreGame() {
  var prevGame;
  try {
    prevGame = JSON.parse(window.localStorage.getItem('prevGame')); //загружаем данные localStorage с ключем 'prevGame'
    arr = prevGame.arr;
    ei = prevGame.ei;
    ej = prevGame.ej;
  } catch (e) {
  }
}
/*
 * cellClick
 */
function cellClick(event) {
  var event = event || window.event,
  /*
   * получаем номер строки и столбца, на пересечении которых
   * расположена ячейка. Мы записали их ранее в её id ячейки.
   */
  el = event.srcElement || event.target,
  i = el.id.charAt(0),
  j = el.id.charAt(2);
  /*
   * Если пустая ячейка расположена в одном стобце или строке
   * с ячейкой, по которой кликнули, и расстояние между
   * этими ячейками 1, то меняем их содержимое местами
   */
  if ((i == ei && Math.abs(j - ej) == 1) || (j == ej && Math.abs(i - ei) == 1)) {
    document.getElementById(ei + " " + ej).innerHTML = arr[ei][ej] = arr[i][j];
    el.innerHTML = arr[i][j] = "";
    //Запоминаем положение пустой ячейки
    ei = i;
    ej = j;
    var q = true;
    for (i = 0; i < 4; ++i) //Проверяем не в выигрышной ли комбинации находятся ячейки. 
      for (j = 0; j < 4; ++j)
        if (i + j != 6 && arr[i][j] != i * 4 + j + 1) {
          q = false;
          break;
        }
    if (q) {
      window.localStorage.removeItem('prevGame'); //удаление данных с ключем 'prevGame'
      alert("Victory!");
    }
  }

  saveGame(); //вызов функции saveGame
}
function newGame(event) {
  if (arr.length && !event) {
    console.log('game restored');
  } else {
    for (i = 0; i < 4; ++i) {
      arr[i] = [];
      for (j = 0; j < 4; ++j) {
        if (i + j != 6)
          arr[i][j] = i * 4 + j + 1;
        else
          arr[i][j] = "";
      }
    }

    ei = 3; //Запоминаем индексы элемента массива,
    ej = 3; // в котором записана пустая строка.
    for (i = 0; i < 1600; ++i)
    // Случайным образом выбираем число от 0 до 3
      switch (Math.round(3 * Math.random())) {
      /*
       * 0 соответсвует верхней соседней костяшке, 1 - правой  и т.д.
       * обратим внимание что обмен местами, например,
       * с верхней костяшкой возможен, если "пустое место"
       * не ноходится у верхней границы игрового поля. Аналогично и для
       * других соседних костяшек. При обмене изменяем переменные ei и ej.
       */
        case 0:
          if (ei != 0) swap(arr, ei, ej, --ei, ej);
          break; // up
        case 1:
          if (ej != 3) swap(arr, ei, ej, ei, ++ej);
          break; // right
        case 2:
          if (ei != 3) swap(arr, ei, ej, ++ei, ej);
          break; // down
        case 3:
          if (ej != 0) swap(arr, ei, ej, ei, --ej); // left
      }
  }

  var table = document.createElement("table"),	//Cоздаём таблицу
  tbody = document.createElement("tbody");
  table.appendChild(tbody);
  for (i = 0; i < 4; ++i) {
    var row = document.createElement("tr");	//Добавляем в неё строки
    for (j = 0; j < 4; ++j) {
      var cell = document.createElement("td");	//Cоздаём ячейки
      cell.id = i + " " + j;
      /* Привязываем к событию, происходящему
       * при клике по ячейке таблицы функцию
       * @cellClick
       */
      cell.onclick = cellClick;
      cell.innerHTML = arr[i][j];
      row.appendChild(cell);
    }
    tbody.appendChild(row);
  }
  /*
   * Проверяем, нет ли у <div id="box"> дочернего эл-та.
   */
  if (box.childNodes.length == 1)
    box.removeChild(box.firstChild);	//Удаляем таблицу, если она есть
  box.appendChild(table);	// Запихиваем в box table</div>

  saveGame();
}
