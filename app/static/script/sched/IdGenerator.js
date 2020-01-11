
class IdGenerator {
  constructor(name)
  {
    this.currentId = 0;
    this.name = name;
  }

  getId = () => {
    return this.name + this.currentId++;
  }
}

export default IdGenerator

