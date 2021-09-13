var arr = [];
//Creating random array from 1 to 100 
while(arr.length < 99){
    var r = Math.floor(Math.random() * 100) + 1; // +1 to not get 0
    if(arr.indexOf(r) === -1) arr.push(r); // to not insert duplicate values
}
//First sorting the array 
for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1; j++) {
        if (arr[i] < arr[j]) {
        let temp = arr[i];
        arr[i]= arr[j];
        arr[j]= temp;
        }
    }
}

let missingNo = missingNumber(arr);
//function to find missing number
function missingNumber(array){
    for (let i = 1; i <= arr.length; i++) {
       if (array[i - 1] !== i) {
        return i;
       }
    }
}
console.log("Missing number is : ",missingNo);