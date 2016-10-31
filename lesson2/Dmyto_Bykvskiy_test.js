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
    var date = new Date().toISOString();
    var output = date + ' ' + prefix + ': ';
    return function(data) {
        console.log(output + JSON.stringify(data));
    };
}

var myLogger = createLogger('My Logger');

myLogger('some data');
