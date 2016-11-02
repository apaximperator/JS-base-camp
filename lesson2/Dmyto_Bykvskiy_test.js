/* 
Напишите функцию, которая будет возвращать набор уникальных символов, 
которые были переданы в эту функцию, как аргумент. Сортировка - не нужна, 
строчные и заглавные буквы - 1 символ.
*/
function extractCharacters(str) {
    var arr = str.split('');
      var obj = {};

    for (var i = 0; i < arr.length; i++) {
        var char = arr[i].toLowerCase();
        obj[char] = true; 
    }

    return Object.keys(obj);
}
extractCharacters('abcd');
    //['a', 'b', 'c', 'd']
extractCharacters('aaaabc');
    //['a', 'b', 'c']
extractCharacters('Hello, world');
    //[ 'h', 'e', 'l', 'o', ',', ' ', 'w', 'r', 'd' ];

/*
Напишите функцию, которая будет возвращать новую функцию, 
с помощью которой можно будет выводить в консоль текстовую информацию.
*/
function createLogger(prefix){
	var finalData=''
 	var date = new Date().toISOString();
    var output = date + ' ' + prefix + ': ';
    return function() {
    	var data=[].slice.call(arguments);

    	for (i=0;i<data.length;++i){
    		if (typeof(data[i])!=='object'){
    			finalData+=' '+data[i];
    		}
    		else {
    			for (k in data[i]){
    				var re= /"/gi
    				finalData+=' Object '+JSON.stringify(data[i]).replace(re,'');
    				
    			}
    		}
     		
    		
    	}
    	return console.log(output + finalData);
    	
	}


}

var myLogger = createLogger('My Logger');
 
myLogger({ data: 1 },'gggg',{ data: 2 },{ data: 3 },46);

//Create a function that will take any number of arguments and return their sum
function sum() {
    var s = 0;
    for (var i=0; i < arguments.length; i++) {
        s += arguments[i];
    }
    return s;
}

/*Create a function called celsiusToFahrenheit:
          Store a celsius temperature into a variable.
          Convert it to fahrenheit and output "NN°C is NN°F"
*/
function celsiusToFahrenheit(c) {
    var c;
    var f=c*1.8+32;
    return console.log(c+'°C is '+ f +'°F');
};

/*Create a function called fahrenheitToCelsius:
          Now store a fahrenheit temperature into a variable.
   Convert it to celsius and output "NN°F is NN°C."
*/
function fahrenheitToCelsius(f) {
    var f;
    var c=(f-32)/1.8;
    return console.log(f+'°F is '+ c +'°C');
};

/*Write a JavaScript function that accepts a string as a parameter and find the longest word within the string.
 
Example string : 'Hello, GlobalLogic!'
Expected Output : 'GlobalLogic'
*/

function longestWord(str) {
    var filteredStr = str.split('').filter(removePunc).join('');
    var wordArr = filteredStr.split(' ');
    var maxWord = wordArr[0];

    for (var i = 1; i < wordArr.length; i++) {
        if (wordArr[i].length > maxWord.length) maxWord = wordArr[i];
    }

    function removePunc(el) {
        return (el !== ',' && el !== ':' && el !== '.' && el !== '!' && el !== '?');
    }
    
    return maxWord;
}

/*
Write a function that can print entity details based on next model:
{
  name: String,
  type: String,
  age: Number
}
Expected output: "%NAME%(%TYPE%) - %AGE%."
*/
var o1 = {
    name: 'Dmitry',
    type: 'Hyman',
    age: 22
};

function showEntityDetails(obj) {
    return "%" + obj.name + "%(%" + obj.type + "%) - %" + obj.age + "%." ;
}

// Output
console.log(showEntityDetails(o1));

/*
Rewrite that function to use this instead of argument 
(use apply, call and bind to print the
details of different entities).
*/
function showEntityDetails(obj) {
    return "%" + this.name + "%(%" + this.type + "%) - %" + this.age + "%." ;
}

// Output: Apply, bind and call
var applied = showEntityDetails.apply(o1, ['name', 'type', 'age']);
var called = showEntityDetails.call(o1, 'name', 'type', 'age');
var binded = showEntityDetails.bind(o1);

console.log(applied);
console.log(called);
console.log(binded());
