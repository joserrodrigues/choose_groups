
import {
  faTimes,
  faMoneyBillAlt,
  faStore,
  faTruck,
  faHandHoldingMedical,
  faBuilding,
  faIdBadge,
  faUserGraduate,
  faHandshake,
  faPeopleArrows,
  faLock,
  faGavel,
  faCar,
  faCity, faUtensils, faFileSignature

} from "@fortawesome/free-solid-svg-icons";


class TypeIdeas {
    constructor () {
        this.typeArray = [];
        
        this.typeArray.push({
          id: 1,
          name: "Financeiro",
          icon: faMoneyBillAlt,
        });
        this.typeArray.push({
          id: 2,
          name: "Varejo",
          icon: faStore,
        });
        this.typeArray.push({
          id: 3,
          name: "Logística",
          icon: faTruck,
        });
        this.typeArray.push({
            id: 4,
            name: 'Saúde',
            icon: faHandHoldingMedical
        });
        this.typeArray.push({
          id: 5,
          name: "Recursos Humanos",
          icon: faIdBadge,
        });
        this.typeArray.push({
          id: 6,
          name: "Educação",
          icon: faUserGraduate,
        });
        this.typeArray.push({
          id: 7,
          name: "Economia Compartilhada",
          icon: faPeopleArrows,
        });
        this.typeArray.push({
          id: 8,
          name: "Empreend. Social",
          icon: faHandshake,
        });
        this.typeArray.push({
          id: 9,
          name: "Cyber Security",
          icon: faLock,
        });
        this.typeArray.push({
          id: 10,
          name: "Jurídico",
          icon: faGavel,
        });
        this.typeArray.push({
          id: 11,
          name: "Mobilidade urbana",
          icon: faCar,
        });
        this.typeArray.push({
          id: 12,
          name: "Intraempreendedorismo",
          icon: faCity,
        });
        this.typeArray.push({
          id: 13,
          name: "Seguros",
          icon: faFileSignature,
        });
        this.typeArray.push({
          id: 14,
          name: "Food Tech",
          icon: faUtensils,
        });
        this.typeArray.push({
            id: 15,
            name: 'Outro',
            icon: faBuilding
        });
    }
    getTypeArray = () => {
        return this.typeArray;
    }

    getTypeName = (id) => {
        let name = "Outro";
        this.typeArray.forEach(element => {
            if(element.id === id){
                name = element.name;
                return;
            }
        });
        return name;
    }

    getTypeByName = (name) => {
        let id = 0;
        this.typeArray.forEach(element => {
            if(element.name === name){
                id = element.id;
                return;
            }
        });
        return id;
    }    

    getIcon = (id) => {
        let icon = faTimes;
        this.typeArray.forEach(element => {
            if(element.id === id){
                icon = element.icon;
                return;
            }
        });
        return icon;
    }
}


export default TypeIdeas;

