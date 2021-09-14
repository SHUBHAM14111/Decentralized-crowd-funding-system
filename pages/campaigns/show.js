import React, { Component } from "react";
import factory from "../../ethereum/factory";
import "semantic-ui-css/semantic.min.css";
import Layout from "../../components/Layout";
import web3 from "../../ethereum/web3";
import getInstance from "../../ethereum/campaign";
import { Card, Button, Grid } from "semantic-ui-react";
import ContributeForm from "../../components/contributeForm";
import { Link } from "../../routes";

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = getInstance(props.query.address);
    const summary = await campaign.methods.getSummary().call();
    return {
      address: props.query.address,
      minimumContribution: summary[0],
      balance: summary[1],
      requestCount: summary[2],
      approversCount: summary[3],
      manager: summary[4],
    };
  }

  renderCards() {
    const {
      minimumContribution,
      balance,
      requestCount,
      approversCount,
      manager,
    } = this.props;
    const items = [
      {
        header: manager,
        meta: "address of the manager",
        description:
          "The manager created this campaign and can create requests",
        style: { overflowWrap: "break-word" },
      },
      {
        header: minimumContribution,
        meta: "Minimum Contribution (wei)",
        description: "You must contribute this much wei to become an approver",
      },
      {
        header: requestCount,
        meta: "Number of requests",
        description:
          "A request tries to withdraw money from the contract. Request must be approved by approvers ",
      },
      {
        header: approversCount,
        meta: "Number of approvers",
        description:
          "Number of people who had already donated to this campaign.",
      },
      {
        header: web3.utils.fromWei(balance, "ether"),
        meta: "Campaign Balance (ether)",
        description:
          "The balance is how much money does this campaign has left to spend",
      },
    ];
    return <Card.Group items={items} />;
  }
  render() {
    return (
      <Layout>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>
            <Grid.Column width={6}>
              <ContributeForm address={this.props.address} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Link route={`/campaigns/${this.props.address}/requests`}>
                <a>
                  <Button primary>View Requests</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;
