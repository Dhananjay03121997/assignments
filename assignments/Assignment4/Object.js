const person = {
    id : 2,
    gender : 'Male'
}
const student = {
    name : 'ravi',
    email : "ravi11@yopmail.com"
}
const newObject = {...person, ...student};
console.log("Old objects", person, student);
console.log("newObject", newObject);