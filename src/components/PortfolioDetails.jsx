export const PortfolioDetails = ({ portfolio }) => {
    return(
    <div>
      <h3>Portfolio Details</h3>
      <ul>
        {Object.entries(portfolio).map(([symbol, { quantity, currentValue }]) => (
          <li key={symbol}>
            {symbol}: {quantity} shares - ${currentValue.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};