import React, { Component } from 'react'
import NumberBox from './NumberBox';
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
                        key = {i}
                        keys = {parseInt(this.state.numbers[i].key, 10)}
                        number = {this.state.numbers[i].number} 
                            />)
                    break;
                case 2:
                    n1.push(<NumberBox
                        key = {i}
                        keys = {parseInt(this.state.numbers[i].key, 10)}
                        number = {this.state.numbers[i].number} 
                            />)
                    break;
                case 3:
                    n2.push(<NumberBox
                        key = {i}
                        keys = {parseInt(this.state.numbers[i].key, 10)}
                        number = {this.state.numbers[i].number} 
                            />)
                    break;
                case 4:
                    n3.push(<NumberBox
                        key = {i}
                        keys = {parseInt(this.state.numbers[i].key, 10)}
                        number = {this.state.numbers[i].number} 
                            />)
                    break;
                case 5:
                    n4.push(<NumberBox
                        key = {i}
                        keys = {parseInt(this.state.numbers[i].key, 10)}
                        number = {this.state.numbers[i].number} 
                            />)
                    break;
                case 6:
                    n5.push(<NumberBox
                        key = {i}
                        keys = {parseInt(this.state.numbers[i].key, 10)}
                        number = {this.state.numbers[i].number} 
                            />)
                    break;
                case 7:
                    n6.push(<NumberBox
                        key = {i} 
                        keys = {parseInt(this.state.numbers[i].key, 10)}
                        number = {this.state.numbers[i].number} 
                            />)
                    break;
                default:
                    n7.push(<NumberBox
                        key = {i} 
                        keys = {parseInt(this.state.numbers[i].key, 10)}
                        number = {this.state.numbers[i].number} 
                        />)
                    break;
            }

        });
        for (let i = 0; i < 8; i++) {
            let a = <div    key = {i} >{eval("n" + i)}</div>
            this.array.push(a) 
        }
    }
    // toggleNumberBool = (ara, key) =>{
    //     if(key > 48){
    //         switch (key) {
    //             case 49:
                    
    //                 break;
            
    //             default:
    //                 break;
    //         }
    //     }
    // }
    render() {
        if(this.state.numbers !== undefined)
            {
                return(
                <div className = "ticketNumbers">
                    {this.array}
                </div>
            )
        }
            else return null;
    }
}

export default TicketNumbers;

