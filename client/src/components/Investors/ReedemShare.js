import "./investors.css"
function ReedemShare({state,account}){
   const reedem = async (e) => {
    try{

        e.preventDefault();
        const { contract } = state;
        const Noofshare = document.querySelector("#shares").value;
        await contract.methods
          .reedemShare(Noofshare)
          .send({ from: account, gas: 2100000 });
    } catch(error){
        alert(error);
      }
      window.location.reload();

   };
    return<><form onSubmit={reedem}>
         <label className="label1" htmlFor="shares">
         <span className="font">Number of Shares:</span>
        </label>
    <input type="text" id="shares"></input>

    <button className="button" type="submit">Reedem Share</button>
    </form><br></br></>
}
export default ReedemShare;