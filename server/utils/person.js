class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  getUserDescription() {
    return `${this.name} is ${this.age} year(s) old.`;
  }
}

const me = new Person('Julie', 29);
const description = me.getUserDescription();
console.log(description);

module.exports = { Person };
