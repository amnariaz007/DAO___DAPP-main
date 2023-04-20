import "./manager.css"
function CreateProposal({state,account}){

    const creationProposal = async (event) => {
      try{

        event.preventDefault();
        const { contract } = state;
  
        const inputDescription = document.querySelector("#description").value;
        const inputamount = document.querySelector("#amount").value;
        const inputrecipient = document.querySelector("#recipient").value;
        //   adding values in contract
        // changing the value using selected account passed as a prop from app.js
        await contract.methods
          .createProposal(inputDescription, inputamount, inputrecipient)
          .send({ from: account, gas: 2100000 });
  
        console.log(inputDescription, inputamount, inputrecipient);
      } catch(error){
        alert(error);
      }
      window.location.reload();
    };
  

    return (
      <>
        <form onSubmit={creationProposal}>
          <label className="label1" htmlFor="name">
            <span className="font">Description:</span>
          </label>
          <input type="text" id="description"></input>
          <label className="label1" htmlFor="amount">
            <span className="font"> Amount Neeed(in Wei):</span>
          </label>
          <input type="text" id="amount"></input>
          <label className="label1" htmlFor="recipient">
            <span className="font">Recipient Address:</span>
          </label>
          <input type="text" id="recipient"></input>
          <button className="button" type="submit">
            Create Proposal
          </button>
        </form>
        <br></br>
      </>
    );
    
   }
   export default CreateProposal;