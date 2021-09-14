import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import getInstance from "../ethereum/campaign";

class RequestRow extends Component {
  onApprove = async () => {
    const campaign = getInstance(this.props.address);
    try {
      const accounts = web3.eth.getAccounts();
      await campaign.methods
        .approveRequest(this.props.id)
        .send({ from: accounts[0] });
    } catch (error) {
      console.error(error);
    }
  };
  onFinalize = async () => {
    const campaign = getInstance(this.props.address);
    try {
      const accounts = web3.eth.getAccounts();
      await campaign.methods
        .finalizeRequest(this.props.id)
        .send({ from: accounts[0] });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { Row, Cell } = Table;
    const { id, request, approversCount } = this.props;
    const readyToFinalze = request.approvalCount > approversCount / 2;
    return (
      <Row
        disabled={request.completed}
        positive={readyToFinalze && !request.completed}>
        <Cell>{id}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{web3.utils.fromWei(request.value, "ether")}</Cell>
        <Cell>{request.recipient}</Cell>
        <Cell>
          {request.approvalCount}/{approversCount}
        </Cell>
        <Cell>
          {request.completed ? null : (
            <Button color='green' basic onClick={this.onApprove}>
              Approve
            </Button>
          )}
        </Cell>
        <Cell>
          {request.completed ? null : (
            <Button color='teal' basic onClick={this.onFinalize}>
              Finalize
            </Button>
          )}
        </Cell>
      </Row>
    );
  }
}

export default RequestRow;
