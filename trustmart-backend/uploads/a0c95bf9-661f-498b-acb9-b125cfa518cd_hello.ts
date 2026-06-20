// interface User{
//     id: number,
//     name: string,
//     age:number,
//     gender: string,
//     email: string,
//     password: string
// }
type User={
    id: number,
    name: string,
    age:number,
    gender: string,
    email: string,
    password: string
}

function printUser(user: User):void{
console.log(`The name is ${user.name},
    The age is ${user.age},
    The gender is ${user.gender}
    The email is ${user.email}
    `);

}

let user={
    id: 1,
    name:"Dikshanta Acharya",
    age: 20,
    gender: "Male",
    email:"dikshantaacharya04@gmail.com",
    password:"@Dikshyant9898"
}
printUser(user);
