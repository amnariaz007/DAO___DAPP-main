import "./investors.css"
function TransferShare({state,account}){

    const Transfer = async (e) => {
      try{

        e.preventDefault();
        const { contract } = state;
        const fetchAccount = document.querySelector("#amount").value;
        const fetchAddress = document.querySelector("#to").value;
        await contract.methods
          .transferShare(fetchAccount, fetchAddress)
          .send({ from: account, gas: 210000 });
      } catch(error){
        alert(error);
      }
    };

    return (
      <>
        <form onSubmit={Transfer}>
          <label className="label1" htmlFor="amount">
            <span className="font">Amount:</span>
          </label>
          <input type="text" id="amount"></input>
          <label className="label1" htmlFor="to">
            <span className="font">Address:</span>
          </label>
          <input type="text" id="to"></input>

          <button className="button" type="submit">
            Transfer Share
          </button>
        </form>
        <br></br>
      </>
    );
   }
   export default TransferShare;