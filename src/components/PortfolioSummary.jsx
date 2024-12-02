export const PortfolioSummary = ({ portfoliovalue, totalstocks, cashBalance }) =>{
    return(
    <div>
        <h3>
            PortFolioSummary
        </h3>
        <p>total portfoliovalue: ${portfoliovalue}</p>
        <p>total stock owned: {totalstocks}</p>
        <p>cashBalance: ${cashBalance}</p>
    </div>
    );
};

    