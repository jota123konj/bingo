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
                        clickHandler = {() => this.toggleNumberTicket(i, this.toggleNumberCss(i, this.generateElements))}
                        key = {i}
                        keys = {this.state.numbers[i].key}
                        number = {this.state.numbers[i].number}
                        added = {this.state.numbers[i].added}
                            />)
                    break;
                case 2:
                    n1.push(<NumberBox
                        clickHandler = {() => this.toggleNumberTicket(i, this.toggleNumberCss(i, this.generateElements))}
                        key = {i}
                        keys = {this.state.numbers[i].key}
                        number = {this.state.numbers[i].number}
                        added = {this.state.numbers[i].added}
                            />)
                    break;
                case 3:
                    n2.push(<NumberBox
                        clickHandler = {() => this.toggleNumberTicket(i, this.toggleNumberCss(i, this.generateElements))}
                        key = {i}
                        keys = {this.state.numbers[i].key}
                        number = {this.state.numbers[i].number}
                        added = {this.state.numbers[i].added}
                            />)
                    break;
                case 4:
                    n3.push(<NumberBox
                        clickHandler = {() => this.toggleNumberTicket(i, this.toggleNumberCss(i, this.generateElements))}
                        key = {i}
                        keys = {this.state.numbers[i].key}
                        number = {this.state.numbers[i].number}
                        added = {this.state.numbers[i].added}
                            />)
                    break;
                case 5:
                    n4.push(<NumberBox
                        clickHandler = {() => this.toggleNumberTicket(i, this.toggleNumberCss(i, this.generateElements))}
                        key = {i}
                        keys = {this.state.numbers[i].key}
                        number = {this.state.numbers[i].number}
                        added = {this.state.numbers[i].added}
                            />)
                    break;
                case 6:
                    n5.push(<NumberBox
                        clickHandler = {() => this.toggleNumberTicket(i, this.toggleNumberCss(i, this.generateElements))}
                        key = {i}
                        keys = {this.state.numbers[i].key}
                        number = {this.state.numbers[i].number}
                        added = {this.state.numbers[i].added}
                            />)
                    break;
                case 7:
                    n6.push(<NumberBox
                        clickHandler = {() => this.toggleNumberTicket(i, this.toggleNumberCss(i, this.generateElements))}
                        key = {i} 
                        keys = {this.state.numbers[i].key}
                        number = {this.state.numbers[i].number}
                        added = {this.state.numbers[i].added}
                            />)
                    break;
                default:
                    n7.push(<NumberBox
                        clickHandler = {() => this.toggleNumberTicket(i, this.toggleNumberCss(i, this.generateElements))}
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
    }

    toggleNumberCss = (index, reGenerateElements) =>{
            this.setDifferentAdded(index);
            // console.log(this.state.numbers[index].added)
            reGenerateElements();
    }
    
    addStateElements = (index) => {
        let tempArray = this.state.elements;
        tempArray.push(this.state.numbers[index].number);
        this.setState({elements: tempArray});
    }
    deleteStateElements = (index) => {
        let tempArray = this.state.elements;
        let counter = 0;
        tempArray.forEach((element) => {
            if(element !== this.state.numbers[index].key){
                tempArray[counter] = element;
                counter++;
            }else{
                console.log('delete element funkcija');
            }
        });
        this.setState({elements: tempArray})
    }

    toggleNumberTicket = (index, callbackF) => {
        if(this.state.numbers[index].added === false){
            if(this.state.elements.length < 6){
                this.addStateElements(index);
                console.log(this.state.elements);
                callbackF;
            }else{
                console.log('nemere više');
            }
        }else{
            this.deleteStateElements(index);
        }
        // ovdje nastavi
    }
    
    
    render() {
        if(this.state.numbers !== undefined)
            {
                return(
                <div className = "ticketNumbers">
                    {this.array}
                    <ActiveTicket></ActiveTicket>
                </div>
            )
        }
            else return null;
    }
}

export default TicketNumbers;

