type User = {
    id : number,
    name : string,
    email : string,
    password : string
};


// Array de Users:
const users: User[] = [
    {
        id: 1,
        name: "Diego",
        email: "diego@gmail.com",
        password : "Qwe.123*"
    },
    {
        id: 2,
        name: "Carlos",
        email: "carlos@gmail.com",
        password: "1234"
    },
    {
        id: 3,
        name: "Maria",
        email: "maria@gmail.com",
        password: "112233"
    }
];

console.log(users);



// FUNCTION TO LOGIN:
function login(email: string, password: string){

    try {
        const us = users.find(
            u => u.email === email && u.password === password
        );

        if(us){

            console.log( ` ${us.name} bienvenido login exitoso.` );
            
            localStorage.setItem("userSession", JSON.stringify(us));

        } else {
            console.log( "Credenciales incorrectas." );
        }
        

    } catch (error) {
        console.log( error );
    }
}


// Trying access with a real and an unreal credentials.
login("Diego", "diego@gmail.com");
login("Mathew", "mateo23xxx@gmail.com");



// FUNCTION TO ADD NEW USERS:
function register(name_: string, email_: string, password_: string){
    try {

        let idCounter = users.length;

        const us = users.find(
            u => u.name === name_ && u.email === email_
        );

        if(!us){

            users.push({id:idCounter+1, name: name_, email: email_, password: password_})

            console.log(`Usuario creado exitosamente con el email '${email_}'`)

        } else{

            console.log( `El usuario ${us.name} con email: ${us.email} ya existe.` );

        }

    } catch (error) {

        console.log(error);

    }
}


// Executing the function:
// Adding successfully:
register("Camila", "camila@gmail.com", "frontend33");

// Adding unsuccess:
register("Diego", "diego@gmail.com", "holaMundo23");

// ShoW all users:
console.log(users);