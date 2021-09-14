import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import Layout from "../../../components/Layout";
import { Button, Form, Message, Input } from "semantic-ui-react";
import { Link, Router } from "../../../routes";
import getInstance from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";
class RequestNew extends Component {
  state = {
    value: "",
    description: "",
    recipient: "",
    errorMessage: "",
    loading: false,
  };
  static async getInitialProps(props) {
    const address = props.query.address;
    return { address };
  }

  onSubmit = async (event) => {
    event.preventDefault();
    this.setState({ errorMessage: "", loading: true });
    const campaign = getInstance(this.props.address);
    const { description, recipient, value } = this.state;

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, "ether"), recipient)
        .send({ from: accounts[0] });
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }
    this.setState({ loading: false });
  };
  render() {
    return (
      <Layout>
        <h3>Create a Request</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Decription</label>
            <Input
              value={this.state.description}
              onChange={(event) =>
                this.setState({ description: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Value in ether</label>
            <Input
              value={this.state.value}
              onChange={(event) => this.setState({ value: event.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Recipient</label>
            <Input
              value={this.state.recipient}
              onChange={(event) =>
                this.setState({ recipient: event.target.value })
              }
            />
          </Form.Field>
          <Message error header='Oops!' content={this.state.errorMessage} />
          <Button primary loading={this.state.loading}>
            Create
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default RequestNew;
