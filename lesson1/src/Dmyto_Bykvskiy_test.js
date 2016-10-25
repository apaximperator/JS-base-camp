/*
	Напишите функцию, которая принимает 1 аргумент и возварщает его тип
*/
function getDataType (variable) {
	return typeof variable;
}

/*
	Напишите функцию, которая принимает 1 аргумент и возвращает:
	'primitive' если тип данных относится к примивным
	'primitive-special' если тип данных специальный
	'object' - если простой обьект
	'object-array' - если массив
	'object-function' - если функция
*/
function getDataTypePseudoName (variable) {
	if (typeof variable === 'number'
	||typeof variable === 'string'
	||typeof variable === 'boolean'){
		return 'primitive';
	}
	else 
		if (variable === undefined
		||variable === null){
			return 'primitive-special';
		}
		else 
			if (typeof variable == 'object'
			&& Array.isArray(variable)){
				return 'object-array';
			}
			else
				if (typeof variable == 'object'
				&& typeof variable === 'function'){
					return 'object-function';
				}
				else
					if (Array.isArray(variable)){
						return 'object'
					}
}
getDataTypePseudoName([1,2,4])
/*
	Напишите функцию, которая принимает 2 аргумента,
	и возврвщает 1 если их значения и их типы равны,
	0 если равны только значения
	и -1 в другом случае
*/
function compareByType (a, b) {
	return a===b
		? 1
		: a==b
			? 0
			:-1;

}

// Numbers

/*
	Напишите функцию, которая принимает 1 аргумент,
	и в случае если аргумент имеет числовой тип увеличивает его на 1
	и возврвщвет результат,
	в любом другом случае возврвщвет -1
*/
function increase (value) {
	return (typeof value === 'number')
		? ++value
		: -1;

}

/*
	Напишите функцию, которая принимает 1 аргумент(число),
	и в случае если аргумент не Infinity или NaN возвращает строку 'safe' иначе 'danger'
*/
function testForSafeNumber (value) {
	return (isFinite(value))
		? 'safe'
		: 'danger';
}



// Strings

/*
	Напишите функцию, которая принимает 1 аргумент (строку),
	и возвращает массив из елементов строки разделенных по пробелу ' '
*/
function stringToArray (str) {
	var arr = str.split(' ');
	return arr;
}


/*
	Напишите функцию, которая принимает 1 аргумент (строку),
	и возвращает часть этой строки до первой запятой
*/
function getStringPart(str) {
	var commaIndex = str.indexOf(',');
	var firstWord = str.slice(0, commaIndex);
	return firstWord;
}

/*
	Напишите функцию, которая принимает 2 аргумента (строку и симовл),
	и возвращает порядковый номер симовола в строе если символ встречается в строке 1 раз,
	false в противоположном случае
*/
function isSingleSymbolMatch(str, symbol) {
	if (str.indexOf(symbol)===str.lastIndexOf(symbol)){
		return str.indexOf(symbol);
	}
	else {
		return false;
	}
}

/*
	Напишите функцию, которая принимает 2 аргумента,
	массив в разделитель[опционально],
	и возвращает строку ввиде элементов массива c разделителями если разделитель задан
	или строку разделенную "-" если не задан
*/
function join (array, separator) {
	if (separator==''){
		return array.join('-');
	}
	else {
		return array.join(separator);
	}
}


/*
	Напишите функцию, которая принимает 2 массива,
	и возвращает один состоящий из элементов перового и второго (последовательно сначала первый потом второй)
*/

function glue (arrA, arrB) {
	arr=arrA.concat(arrB);
	return arr;
}


/*
	Напишите функцию, которая принимает 1 массив,
	и возвращает другой массив отсортированный от большего к меньшему
*/
function order (arr) {
	var newArr= arr.sort();
	return newArr.reverse();

}


/*
	Напишите функцию, которая принимает 1 массив,
	и возвращает другой без чисел которые меньше 0
*/
function removeNegative (arr) {
	for (i=0; i<arr.length; i++){
		if (arr[i]<=0){
		arr.splice(i,1);
		}
	}
	return arr;
}

/*
	Напишите функцию, которая принимает 2 числовых массива,
	и возвращает новый массив, состоящий из элементов первого но без элементов
	которые присутствуют во втром
	[1,2,3], [1, 3] => [2]
*/
function without (arrA, arrB) {
	for (i=0; i<arrA.length; i++){
		for (j=0; j<arrB.length; j++){
			if (arrA[i]===arrB[j]){
				arrA.splice(i,1);
			}
		}
	}
	return arrA;
}
