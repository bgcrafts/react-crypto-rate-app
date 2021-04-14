import React, { Component } from 'react';
import './Crypto.css';
import Axios from 'axios';
import CryptoList from './CryptoList';
import axios from 'axios';

class Crypto extends Component {

    constructor(props){
        super(props) 
            this.state = {
                CryptoList:[]
            };
        
    }

    componentDidMount() {
        this.getCryptoData();
    }
    getCryptoData = () => {
        axios.get('https://blockchain.info/pl/ticker')
            .then(res => {
                const tickers = res.data;
                this.setState((state) => {
                        let newCryptoList = [];

                        for (const [ticker,cryptoRate] of Object.entries(tickers)) {
                            let lastCryptoObj = state.cryptoList.find((cryptoObj) => {
                                return(cryptoObj.currency === ticker);
                            })

                            let newCryptoObj = {
                                currency:ticker,
                                symbol:cryptoRate.symbol,
                                buy:cryptoRate.buy,
                                sell: cryptoRate.sell,
                                lastRate: cryptoRate.last,
                            }
                            newCryptoList.push(newCryptoObj);
                            
                        }
                        return ({
                            cryptoList: newCryptoList


                        })
                });
                // console.log(res.data);
                
            });
    }
    render () {
        return (
            <div className="Crypto">
               <CryptoList cryptoList={this.state.cryptoList}/>
            </div>
        );
    }
}

export default Crypto;