import React, { Component } from 'react'
import NumberBox from './NumberBox';
import './TicketNumbers.css'

class TicketNumbers extends Component {
    
    toggleNumberBool = () => {

    }
    render() {
        return(
            <div className = "ticketNumbers">
                <div className="">
                    <NumberBox keys = {1} number = {1} />
                    <NumberBox keys = {9} number = {9} />
                    <NumberBox keys = {17} number = {17} />
                    <NumberBox keys = {25} number = {25} />
                    <NumberBox keys = {33} number = {33} />
                    <NumberBox keys = {41} number = {41} />
                    <NumberBox keys = {49} number = {"^"} />
                </div>
                <div className="">
                    <NumberBox keys = {2} number = {2}/>
                    <NumberBox keys = {10} number = {10}/>
                    <NumberBox keys = {18} number = {18}/>
                    <NumberBox keys = {26} number = {26}/>
                    <NumberBox keys = {34} number = {34}/>
                    <NumberBox keys = {42} number = {42}/>
                    <NumberBox keys = {50} number = {"^"}/>
                </div>
                <div className="">
                    <NumberBox keys = {3} number = {3}/>
                    <NumberBox keys = {11} number = {11}/>
                    <NumberBox keys = {19} number = {19}/>
                    <NumberBox keys = {27} number = {27}/>
                    <NumberBox keys = {35} number = {35}/>
                    <NumberBox keys = {43} number = {43}/>
                    <NumberBox keys = {51} number = {"^"}/>
                </div>
                <div className="">
                    <NumberBox keys = {4} number = {4}/>
                    <NumberBox keys = {12} number = {12}/>
                    <NumberBox keys = {20} number = {20}/>
                    <NumberBox keys = {28} number = {28}/>
                    <NumberBox keys = {36} number = {36}/>
                    <NumberBox keys = {44} number = {44}/>
                    <NumberBox keys = {52} number = {"^"}/>
                </div>
                <div className="">
                    <NumberBox keys = {5} number = {5}/>
                    <NumberBox keys = {13} number = {13}/>
                    <NumberBox keys = {21} number = {21}/>
                    <NumberBox keys = {29} number = {29}/>
                    <NumberBox keys = {37} number = {37}/>
                    <NumberBox keys = {45} number = {45}/>
                    <NumberBox keys = {53} number = {"^"}/>
                </div>
                <div className="">
                    <NumberBox keys = {6} number = {6}/>
                    <NumberBox keys = {14} number = {14}/>
                    <NumberBox keys = {22} number = {22}/>
                    <NumberBox keys = {30} number = {30}/>
                    <NumberBox keys = {38} number = {38}/>
                    <NumberBox keys = {46} number = {46}/>
                    <NumberBox keys = {54} number = {"^"}/>
                </div>
                <div className="">
                    <NumberBox keys = {7} number = {7}/>
                    <NumberBox keys = {15} number = {15}/>
                    <NumberBox keys = {23} number = {23}/>
                    <NumberBox keys = {31} number = {31}/>
                    <NumberBox keys = {39} number = {39}/>
                    <NumberBox keys = {47} number = {47}/>
                    <NumberBox keys = {55} number = {"^"}/>
                </div>
                <div className="">
                    <NumberBox keys = {8} number = {8}/>
                    <NumberBox keys = {16} number = {16}/>
                    <NumberBox keys = {24} number = {24}/>
                    <NumberBox keys = {32} number = {32}/>
                    <NumberBox keys = {40} number = {40}/>
                    <NumberBox keys = {48} number = {48}/>
                    <NumberBox keys = {56} number = {"^"}/>
                </div>
    
                
            </div>
        )
    }
}

export default TicketNumbers;