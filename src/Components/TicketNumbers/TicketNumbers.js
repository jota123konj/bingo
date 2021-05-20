import React, { Component } from 'react'
import NumberBox from './NumberBox';
import ActiveTicket from './ActiveTicket';
import './TicketNumbers.css'
import Numbers from '../../dataNumbers.json'
import axios from 'axios';

class TicketNumbers extends Component {
    constructor(props) {
        super(props);
        this.state = Numbers;
        this.generateElements();
    }
    
    array = []

    generateElements = () => {
        this.array = []
        let n0 = [];
        let n1 = [];
        let n2 = [];
        let n3 = [];
        let n4 = [];
        let n5 = [];
        let n6 = [];
        let n7 = [];
        this.state.numbers.forEach((element, i) => {
            switch ((i+1)%8){
                case 1:
                    n0.push(<NumberBox
                        clickHandler = {() => this.toggleNumberTicket(i)}
                        key = {i}
                        keys = {this.state.numbers[i].key}
                        number = {this.state.numbers[i].number}
                        added = {this.state.numbers[i].added}
                            />)
                    break;
                case 2:
                    n1.push(<NumberBox
                        clickHandler = {() => this.toggleNumberTicket(i)}
                        key = {i}
                        keys = {this.state.numbers[i].key}
                        number = {this.state.numbers[i].number}
                        added = {this.state.numbers[i].added}
                            />)
                    break;
                case 3:
                    n2.push(<NumberBox
                        clickHandler = {() => this.toggleNumberTicket(i)}
                        key = {i}
                        keys = {this.state.numbers[i].key}
                        number = {this.state.numbers[i].number}
                        added = {this.state.numbers[i].added}
                            />)
                    break;
                case 4:
                    n3.push(<NumberBox
                        clickHandler = {() => this.toggleNumberTicket(i)}
                        key = {i}
                        keys = {this.state.numbers[i].key}
                        number = {this.state.numbers[i].number}
                        added = {this.state.numbers[i].added}
                            />)
                    break;
                case 5:
                    n4.push(<NumberBox
                        clickHandler = {() => this.toggleNumberTicket(i)}
                        key = {i}
                        keys = {this.state.numbers[i].key}
                        number = {this.state.numbers[i].number}
                        added = {this.state.numbers[i].added}
                            />)
                    break;
                case 6:
                    n5.push(<NumberBox
                        clickHandler = {() => this.toggleNumberTicket(i)}
                        key = {i}
                        keys = {this.state.numbers[i].key}
                        number = {this.state.numbers[i].number}
                        added = {this.state.numbers[i].added}
                            />)
                    break;
                case 7:
                    n6.push(<NumberBox
                        clickHandler = {() => this.toggleNumberTicket(i)}
                        key = {i} 
                        keys = {this.state.numbers[i].key}
                        number = {this.state.numbers[i].number}
                        added = {this.state.numbers[i].added}
                            />)
                    break;
                default:
                    n7.push(<NumberBox
                        clickHandler = {() => this.toggleNumberTicket(i)}
                        key = {i} 
                        keys = {this.state.numbers[i].key}
                        number = {this.state.numbers[i].number}
                        added = {this.state.numbers[i].added}
                        />)
                    break;
            }

        });
        for (let i = 0; i < 8; i++) {
            let a = <div key = {"p" + i}>{eval("n" + i)}</div>
            this.array.push(a)
        }
    }

    setSingleDifferentAdded = (index) => {
        let tempState = this.state.numbers;
        if(tempState[index].added === true){            
            tempState[index].added = false;
        }else{
            tempState[index].added = true;       
        }

        this.setState({
            numbers: tempState
        });
        this.generateElements();
    }
    addTicketNumber = (index) => {
        //dodaj broj u state niz
        let tempArray = this.state.elements;
        tempArray.push(this.state.numbers[index].key);
        //stavi novi niz u state
        this.setState({
            elements: tempArray
        });
        //promijeni added bool u true
        this.setSingleDifferentAdded(index);
    }

    deleteTicketNumber = (index) => {
        //izvadi iz niza element koji je kliknut
        let tempArray = this.state.elements.filter(element => {
            return element !== this.state.numbers[index].key;
        });
        //postavi novi niz u state
        this.setState({
            elements: tempArray
        });
        //promijeni added bool u false
        this.setSingleDifferentAdded(index);
    }
    addColorNumbers = (index) => {
        console.log('color clicked')
        let tempTicketNumbers = [];
        let tempStateNumbers = this.state.numbers
        
        tempStateNumbers.forEach(element => {
            element.added=false;
        });
        
        
        if(this.checkColor(index)){
            this.setState({
                    numbers: tempStateNumbers,
                    elements: tempTicketNumbers
            })
        }else{
            
            
            let ind=index+1;
            for (let i = ind%8; i < 49;) {
                if(i===0){
                    i=8;
                }
                tempTicketNumbers.push(i);
                //console.log("addcolorNUmbers, i: "+i);
                tempStateNumbers[i-1].added = true;
                i=i+8;
            }
            
            if (tempTicketNumbers.length === 6) {
                this.setState({
                    numbers: tempStateNumbers,
                    elements: tempTicketNumbers
                })            
            }
        }
        
        
        this.generateElements();
    }
    
    checkColor=(index)=>{
        let modul=index+1;
        modul=modul%8;
        
        let tempTicketNumbers=this.state.elements;
        let brojac=0;
        tempTicketNumbers.forEach(a => {
            if((a%8)===modul){
                brojac=brojac+1;
            }
        });
        
        if(brojac===6){
            return true;
        }else{
            return false;
        }
    }
    
    
    toggleNumberTicket = (index) => {
        //nastavi: if index < 48 za boje. Koristi filter
        if (index < 48) {
            if(this.state.numbers[index].added){
                this.deleteTicketNumber(index);
            }else{
                if (this.state.elements.length < 6) {
                    this.addTicketNumber(index);
                    
                }else{
                    return console.log('nemere više');
                }
            }
        }else{
            this.addColorNumbers(index);
            
        }
        
    }
    
    postTicket=()=>{
        
        if(this.state.elements.length===6){
        
            let numString="";
            this.state.elements.forEach((e,i)=>{
                if(i===5){
                    numString=numString+e;
                }else{
                    numString=numString+e+",";
                }
            });
            
            //console.log("String: " + numString);
            const parametri={"selectedNum": numString,
                                "stake": 1
                                };
            //console.log("Objekt: ",parametri);
            axios.post(` http://138.68.72.169:8000/api/tickets`, parametri, {
                headers: {
                    authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJMdWNreVNpeFNlcnZpY2VBY2Nlc3NUb2tlbiIsImp0aSI6IjA3MTJkYzdhLWEzNjctNDlhMi04ZTZhLWQ2YjVkYmQzMGUxMiIsImlhdCI6IjEyLjUuMjAyMS4gODo1OTowMCIsIklkIjoiNDgiLCJVc2VyTmFtZSI6InVzZXIzIiwiRmlyc3ROYW1lIjoiVG9pIiwiTGFzdE5hbWUiOiJUb25uaSIsImV4cCI6MTYyMDg5NjM0MCwiaXNzIjoiTHVja3lTaXhBdXRoZW50aWNhdGlvblNlcnZlciIsImF1ZCI6Ikx1Y2t5U2l4U2VydmljZVBvc3RtYW5DbGllbnQifQ.pUDg24f8vNU2cCklY_oQ48JtPfqVauzVDtmMob4v_Uc",
                    userid: "48"
                }
            });
            
            let emptyArray=[];
            let tempStateNumbers=this.state.numbers;
            
            tempStateNumbers.forEach(element => {
                element.added=false;
            });
            this.setState({
                        numbers: tempStateNumbers,
                        elements: emptyArray
                })
            
        }else{
            console.log("Nije odabrano 6 brojeva: ");
        }
    this.generateElements();
    
    
    }
    clearSelection = () => {
        let emptyArray=[];
            let tempStateNumbers=this.state.numbers;
            
            tempStateNumbers.forEach(element => {
                element.added=false;
            });
            this.setState({
                        numbers: tempStateNumbers,
                        elements: emptyArray
                })
                
    this.generateElements();
    }
    
    render() {
        if(this.state.numbers !== undefined)
            {
                return(
                    <div className = 'ticketNumbers'>
                        <div className = "numbersSelection">
                            {this.array}
                        </div>
                        <button onClick = {this.clearSelection}>Clear selection</button>
                        <ActiveTicket clickHandler = {this.postTicket}>{this.state.elements}</ActiveTicket>
                    </div>
            )
        }
            else return null;
    }
}

export default TicketNumbers;

