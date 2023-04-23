
const ATMDeposit = ({ onChange, isDeposit, isValid }) => {
    const choice = ["Deposit", "Withdraw"];
    console.log(`ATM isDeposit: ${isDeposit}`);
    return (
      <label className="label huge">
        <h3 className="mt-3"> {choice[Number(!isDeposit)]}</h3>
        <div>
        <input className="form-control" placeholder="enter amount" type="number" width="100" onChange={onChange}></input>
        <button class="btn btn-primary ml-2" type="submit" disabled={!isValid} width="100" value="Submit">Submit</button>

        </div>
      </label>
    );
  };
  
  const Account = () => {
    const [deposit, setDeposit] = React.useState(false);
    const [totalState, setTotalState] = React.useState(0);
    const [isDeposit, setIsDeposit] = React.useState(true);
    const [atmMode, setATMMode] = React.useState("");
    const [validTransaction, setValidTransaction] = React.useState(false);
  
    let status = `Account Balance $ ${totalState} `;
    console.log(`Account Rendered with isDeposit: ${isDeposit}`);
    const handleChange = (event) => {
      console.log(`handleChange ${event.target.value}`);
        if (Number(event.target.value) <= 0) {
           return setValidTranaction(false);
        } if (atmMode === "Withdraw" && Number(event.target.value) > totalState) {
          setValidTransaction(false);
        } else {
          setValidTransaction(true);
        }
      setDeposit(Number(event.target.value));
    };
    const handleSubmit = (event) => {
      let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
      setTotalState(newTotal);
      setValidTransaction(false);
      event.target.element[0].value = 0;
      event.preventDefault();
  
    };
  
    const handleModeSelect = (event) => {
      setATMMode(event.target.value);
      setValidTransaction(false);
      if (event.target.value === 'Deposit'){
        setIsDeposit(true);
      } else {
        setIsDeposit(false);
      }
    };
  
    return (
      <form onSubmit={handleSubmit}> 
        <div>
          <div className="machine">
            CASH MACHINE</div>
              <h2 className="status" id="total">{status}</h2>
              <label className="label">Select an action to continue</label>
                <select class="form-select form-select-lg mb-3 btn-outline-success" aria-label=".form-select-lg example" onChange={(e) => handleModeSelect(e)} name="mode" id="mode- select">
                  Select
                    <option id="no-selection" value=""></option>
                    <option id="deposit-selection" value="Deposit">Deposit</option>
                    <option id="withdraw-selection" value="Withdraw">Withdraw</option>
                  </select>
                    {atmMode && (<ATMDeposit 
                      onChange={handleChange} 
                      isDeposit={isDeposit}
                      isValid={validTransaction}
                      ></ATMDeposit>
                      )}
        </div>
      </form>
    );
  };
  // ========================================
  ReactDOM.render(<Account />, document.getElementById("root"));
  