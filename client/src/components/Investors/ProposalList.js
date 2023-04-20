import { useState, useEffect } from "react";

function ProposalList({ state }) {
  const [list, setList] = useState([]);

  useEffect(() => {
    const { contract } = state;

    const getProposalList = async () => {
      const proposalArray = await contract.methods.ProposalList().call();
      const updatedProposalArray = proposalArray.map((proposal) => {
        const date = new Date(proposal.end * 1000);
        const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
        return {
          ...proposal,
          end: formattedDate,
        };
      });
      setList(updatedProposalArray);
    };

    contract && getProposalList();
  }, [state]);

  return (
    <>
      <div className="list">
        <h3>Proposal List</h3>
        <table>
          <tbody>
            <tr>
              <th>ID</th>
              <th>DESCRIPTION</th>
              <th>AMOUNT</th>
              <th>RECIPIENT</th>
              <th>VOTES</th>
              <th>END TIME</th>
            </tr>

            {list.map((proposal) => {
              return (
                <tr key={proposal.id}>
                  <td>{proposal.id}</td>
                  <td>{proposal.description}</td>
                  <td>{proposal.amount}</td>
                  <td>{proposal.receipient}</td>
                  <td>{proposal.votes}</td>
                  <td>{proposal.end}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ProposalList;
