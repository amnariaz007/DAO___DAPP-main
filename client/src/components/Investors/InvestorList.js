import {useState,useEffect} from "react"
function InvestorList({state}){
  const [List, setlist] = useState([]);
  useEffect(() => {
    const { contract } = state;
    const investors = async () => {
      const list = await contract.methods.InvestorList().call();

      setlist(list);

      console.log(list);
    };
    contract && investors();
  },[state]);
  return (
    <>
      <div className="list">
        <h3>
          Investor's List
          <br />
          {List.map((investoraddress) => {
            return <p key={investoraddress}>{investoraddress}</p>;
          })}
        </h3>
      </div>
    </>
  );
  }
  export default InvestorList;