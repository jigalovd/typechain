const name = "Dima",
      age = 28,
      gender = "male"

const sayHi = (name: string, age: number, gender?: string): void => console.log(`Hello ${name}, you are ${age} ages old and you are ${gender}`);

sayHi(name, age, gender);
export {}
