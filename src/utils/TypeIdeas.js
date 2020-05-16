
import { faTimes, faMoneyBillAlt, faStore, faTruck, 
    faHandHoldingMedical, faBuilding, faIdBadge, faUserGraduate } from '@fortawesome/free-solid-svg-icons'


class TypeIdeas {
    constructor () {
        this.typeArray = [];
        
        this.typeArray.push({
            id: 1,
            name: 'Fintech',
            icon: faMoneyBillAlt
        });
        this.typeArray.push({
            id: 2,
            name: 'RetailTech',
            icon: faStore
        });
        this.typeArray.push({
            id: 3,
            name: 'LogTech',
            icon: faTruck
        });
        this.typeArray.push({
            id: 4,
            name: 'HealthTech',
            icon: faHandHoldingMedical
        });
        this.typeArray.push({
            id: 5,
            name: 'HRTech',
            icon: faIdBadge
        });
        this.typeArray.push({
            id: 7,
            name: 'EdTech',
            icon: faUserGraduate
        });
        this.typeArray.push({
            id: 6,
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

