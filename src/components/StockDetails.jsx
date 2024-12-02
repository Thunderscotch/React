export const StockDetails = ({ stocks, onSelectStocks}) => {
    return(
        <div>
            <h3>
                StockList
            </h3>
            <ul>
                {stocks.map(stocks=>(
                  <li key={stocks.symbol} onClick={()=> onSelectStocks(stocks)}>
                    {stocks.symbol} -{stocks.name}: ${stocks.price}
                  </li>  
                ))}
            </ul>
        </div>
    );
};