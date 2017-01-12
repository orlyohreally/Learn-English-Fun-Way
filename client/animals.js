function randomInteger(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}
function getRandomArray(array, arrayB) {
	var arrayA = [];
	for(var i = 0; i < array.length; i++)
		arrayA[i] = array[i];
	console.log("arrayA", arrayA);
	
	for (var i = 0; i < arrayB.length; i++) {
		var j = randomInteger(0, arrayA.length);
		console.log(arrayA[j]);
		arrayB[i] = arrayA[j];
		arrayA.splice(j, 1);
	}
	return arrayB;
}