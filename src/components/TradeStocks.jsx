import React, {useState} from "react"

export const TradeStocks= ({selectedStocks, portfolio, checkBalance, onTrade }) => 
    {
        const [quantity, setQuantity] = useState(0);
        const [tradeType, setTradeType] =useState("buy");
   

    const handleSubmit =() => {
        if (quantity <=0){
            alert("quantity must be greated than 0");
            return;
        }
        onTrade(selectedStocks, tradeType, quantity);
    };
    
    return (
        <div>
            <h3>Trade {selectedStocks.symbol} </h3>
            <input 
            type="number"
            value={quantity}
            onChange={e => setQuantity(Number(e.target.value))}
            placeholder="Quantity" />
        
        <select name="type" value={tradeType} onChange={e => setTradeType(e.target.value)}>
        <option value="buy">buy</option>
        <option value="sell">sell</option>
        </select>
        <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};