import "./App.css";
import { PortfolioSummary}  from "./components/PortfolioSummary";
import { useState,useEffect } from "react";
import { StockDetails } from "./components/StockDetails";
import { TradeStocks } from "./components/TradeStocks";
import { PortfolioDetails } from "./components/PortfolioDetails";
//import { set } from 'mongoose';

const App = () => {
  const [portfolio, setPortfolio] = useState({});
  const [cashBlance, setCashBalance] = useState(10000);
  const [stocks, setStocks] = useState([]);
  const [selectedStocks, setSelectedStocks] = useState(null);

  const fetchMockData=() =>[
    {symbol:"AAPL",name: "Apple Inc.", price: Math.random() * 200 + 100},
    {symbol:"TSLA",name: "Tesla Inc.", price: Math.random() * 300 + 150},
    {symbol:"GOOGL",name: "Alphabet Inc.", price: Math.random() * 250 + 200}
];

  useEffect(()=>{
    const updateStockPrices= () => {
      setStocks(fetchMockData());
};
  updateStockPrices();
  const interval =setInterval(updateStockPrices, 2000);
  return () => clearInterval(interval);
}, []);


    const handleTrade = (stock,  tradeType, quantity) => {
      const stockPrice = stock.price * quantity;
      
      if (tradeType === "buy" ){
        if(cashBlance < stockPrice){
          alert("insufficient balance");
          return;
        }
      

      setPortfolio(port => ({
        ...port,
        [stock.symbol]:{ 
          quantity:(port[stock.symbol]?.quantity || 0)+ quantity,
          currentValue: stock.price *(port[stock.symbol]?.quantity || 0)+ quantity,
        },
      }));
      
      setCashBalance(bal => bal - stockPrice);
    } else if(tradeType === "sell"){
      if (!portfolio[stock.symbol] || portfolio[stock.symbol].quantity < quantity){
          alert("not enough stocks");
          return;
      }
      setPortfolio(prev => {
        const updatedQuantity = prev[stock.symbol].quantity - quantity;
        if (updatedQuantity === 0) {
          const { [stock.symbol]: _, ...rest } = prev;
          return rest;
        }
        return {
          ...prev,
          [stock.symbol]: {
            quantity: updatedQuantity,
            currentValue: updatedQuantity * stock.price,
          },
      }})

      setCashBalance(bal => bal + stockPrice);
    };
    };


  return (
    <div className="center-screen">
      <h1 style={{textAlign:"center"}}> Stock Market </h1>
      <div>        
        <PortfolioSummary
          portfoliovalue={Object.values(portfolio).reduce((sum,stock)=> sum+ stock.currentValue, 0)}
          totalstocks={Object.values(portfolio).reduce((sum,stock)=> sum+ stock.quantity, 0)}
          cashBalance={cashBlance}
        />
        <PortfolioDetails portfolio={portfolio}/>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <StockDetails stocks={stocks} onselectStocks={setSelectedStocks}/>
          {/* {selectedStocks && ( */}
          <TradeStocks
          selectedStocks={selectedStocks}
          portfolio={portfolio}
          cashBalance={cashBlance}
          onTrade={handleTrade}
          />
          {/* )} */}
      </div>
      </div>
  );
};

export default App;
