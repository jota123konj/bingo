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
        
        if(this.state.elements.length===6 && this.state.bid >= 1 && this.state.bid <= 100){
        
            let numString="";
            let bidString = this.state.bid.toString(10);
            this.state.elements.forEach((e,i)=>{
                if(i===5){
                    numString=numString+e;
                }else{
                    numString=numString+e+",";
                }
            });
            ////////////////////////////////////////////////////////////////////
            this.props.funkProp();/////////////////////////////////////////////
            
            
            //console.log("String: " + numString);
            const parametri={"selectedNum": numString,
                                "stake": bidString
                                };
            //console.log("Objekt: ",parametri);
            axios.post(` http://157.230.112.77:8000/api/tickets`, parametri, {
                headers: {
                    //authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJMdWNreVNpeFNlcnZpY2VBY2Nlc3NUb2tlbiIsImp0aSI6ImNkMzYxM2FiLTY0NzktNGYxOS04YzQ4LTQxZmJkODZlOGFmOCIsImlhdCI6IjA1LzI2LzIwMjEgMTI6NDY6MjUiLCJJZCI6IjQ4IiwiVXNlck5hbWUiOiJ1c2VyMyIsIkZpcnN0TmFtZSI6IlRvaSIsIkxhc3ROYW1lIjoiVG9ubmkiLCJleHAiOjE2MjIxMTk1ODUsImlzcyI6Ikx1Y2t5U2l4QXV0aGVudGljYXRpb25TZXJ2ZXIiLCJhdWQiOiJMdWNreVNpeFNlcnZpY2VQb3N0bWFuQ2xpZW50In0.4rrOHQ_uvowfO7P3wIPT6e6FtBia22yWvdUiE7RRtV8",
                    authorization: localStorage.getItem("session-id"),
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
                        elements: emptyArray,
                        bid: ''
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
    
    rng=()=>{
        let svi=[];
        let izvuceni=[];
        for(let i=1;i<49;i++){
            svi[i]=i;
        }
        let rnd=0;
        let ukupni=48;
        for(let i=0;i<6;i++){
            rnd=Math.floor((Math.floor((Math.random()*100)+1))*(ukupni/100));
            izvuceni[i]=svi[rnd];
            svi=svi.filter(broj=>broj!==svi[rnd]);
            ukupni--;
            
        }
        
        return izvuceni;
    }
    
    selectRandom = () =>{
        
        let tempTicketNumbers = [];
        tempTicketNumbers=this.rng();
        let tempStateNumbers = this.state.numbers
        
        let tempArray=tempTicketNumbers;
        
        tempStateNumbers.forEach(element => {
            element.added=false;
        });
        
        for(let i=1;i<49;i++){
            for(let a=0;a<tempArray.length;a++){
                
                if(tempStateNumbers[i].key===tempArray[a]){
                    tempStateNumbers[i].added=true;
                    tempArray=tempArray.filter(element=>element!==tempArray[a]);
                    console.log(tempArray);
                }
                
            }
        }
        this.setState({
                    numbers: tempStateNumbers,
                    elements: tempTicketNumbers
                });
        
        this.generateElements();
        
        /*
        axios.get(` http://157.230.112.77:8000/api/tickets`, {
            headers: {
                    authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJMdWNreVNpeFNlcnZpY2VBY2Nlc3NUb2tlbiIsImp0aSI6IjJmOTdlN2QzLWFhZDktNDNhYy1iYjQ3LTllZWU4NzZkNTQ4NCIsImlhdCI6IjA1LzI2LzIwMjEgMTE6NDc6NTkiLCJJZCI6IjQ4IiwiVXNlck5hbWUiOiJ1c2VyMyIsIkZpcnN0TmFtZSI6IlRvaSIsIkxhc3ROYW1lIjoiVG9ubmkiLCJleHAiOjE2MjIxMTYwNzksImlzcyI6Ikx1Y2t5U2l4QXV0aGVudGljYXRpb25TZXJ2ZXIiLCJhdWQiOiJMdWNreVNpeFNlcnZpY2VQb3N0bWFuQ2xpZW50In0.YaNnjquXyN-j2l0H8-pRJOuiRPWC61FJPXCYz8ThMcQ",
                    userid: "48"
                }
        }).
        then((res) => {
            console.log(res.data);
         });
        */
    }
    handleCallback = (childData) => {
        this.setState({bid: childData});
        console.log(childData)
    }
    
    render() {
        if(this.state.numbers !== undefined)
            {
                return(
                    <div className = 'ticketNumbers'>
                        <div className = "numbersSelection">
                            {this.array}
                        </div>
                        <div className = 'ticketButtonWrapper'>    
                            <button onClick = {this.clearSelection} className = 'ticketButton'>
                                <i className="fas fa-trash"></i>
                            </button>
                            
                        <ActiveTicket bidAmountCallback = {this.handleCallback} bid = {this.state.bid} clickHandler = {this.postTicket}>{this.state.elements}</ActiveTicket>
                            <button onClick = {this.selectRandom} className = 'ticketButton'>
                                <i className="fas fa-random"></i>
                            </button>
                        </div>
                    </div>
            )
        }
            else return null;
    }
}

export default TicketNumbers;

