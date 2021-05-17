import React, { Component } from 'react'
import NumberBox from './NumberBox';
import ActiveTicket from './ActiveTicket';
import './TicketNumbers.css'
import Numbers from '../../dataNumbers.json'

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

    setDifferentAdded = (index) => {
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
        this.setDifferentAdded(index);
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
        this.setDifferentAdded(index);
    }
    
    toggleNumberTicket = (index) => {
        //nastavi: if index < 48 za boje. Koristi filter
        if(this.state.numbers[index].added){
            this.deleteTicketNumber(index);
        }else{
            if (this.state.elements.length < 6) {
                this.addTicketNumber(index);

            }else{
                return console.log('nemere više');
            }
        }
    }
    
    render() {
        if(this.state.numbers !== undefined)
            {
                return(
                    <div className = 'ticketNumbers'>
                        <div className = "numbersSelection">
                            {this.array}
                        </div>
                        <ActiveTicket>{this.state.elements}</ActiveTicket>
                    </div>
            )
        }
            else return null;
    }
}

export default TicketNumbers;

