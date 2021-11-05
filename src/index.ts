class Human {
  public name: string;
  public age: number;
  public gender: string;
  private pGender: string;
  
  constructor(name: string, age: number, gender: string) {
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.pGender = "private value"
  }

  sayPrivate() {
    console.log(this.pGender);
  }
}

const person = new Human("Dima", 38, "male");

const sayHi = (person: Human): void => console.log(`Hello ${person.name}, you are ${person.age} ages old and you are ${person.gender}`);

sayHi(person);
export {}
