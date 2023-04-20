import "./manager.css"
function ExecuteProposal({state,account}){

   const execute = async (event) => {
     try {
       const { contract } = state;
       event.preventDefault();
       const ProposalID = document.querySelector("#id").value;
       await contract.methods
         .executeProposal(ProposalID)
         .send({ from: account, gas: 2100000 });
     } catch (error) {
       alert(error);
     }
     window.location.reload();
   };
   return (
     <>
       <form onSubmit={execute}>
         <label className="label1" htmlFor="proposalId">
           <span className="font">Proposal Id:</span>
         </label>
         <input type="text" id="id"></input>
         <button className="button" type="submit">
           Execute
         </button>
       </form>
       <br></br>
     </>
   );
    
   }
   export default ExecuteProposal;