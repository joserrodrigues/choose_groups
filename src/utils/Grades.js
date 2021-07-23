
class Grades {
  constructor() {
    this.typeArray = [];
 
    this.typeArray.push({
      id: 1,
      name: "ARQUITETURA DE SOLUÇÕES",
    });
    this.typeArray.push({
      id: 2,
      name: "ENGENHARIA DE SOFTWARE",
    });
    this.typeArray.push({
      id: 3,
      name: "CYBER SECURITY",
    });
    this.typeArray.push({
      id: 4,
      name: "GESTÃO DE TI",
    });
    this.typeArray.push({
      id: 5,
      name: "GESTÃO ESTRATÉGICA DE NEGÓCIOS",
    });
    this.typeArray.push({
      id: 6,
      name: "BIG DATA",
    });
    this.typeArray.push({
      id: 7,
      name: "BUSINESS INTELIGENCE",
    });
    this.typeArray.push({
      id: 8,
      name: "ENGENHARIA DE DADOS",
    });
  }
  getGradesArray = () => {
    return this.typeArray;
  };

  getGradeByName = (name) => {
    let id = 0;
    this.typeArray.forEach((element) => {
      if (element.name === name) {
        id = element.id;
        return;
      }
    });
    return id;
  };

}

export default Grades;
