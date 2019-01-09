import React, { PureComponent } from "react";
import { withRouter } from "react-router";
import { Route, Switch } from "react-router-dom";
import * as MyNobulRoutes from "../../routes/myNobul";
import dualUserTypeScene from "../../utilities/dualUserTypeScene";

/* TODO
- replace placeholder PureComponents with actual page 
in myNobul (agent view)
*/

const Placeholder = props => (
  <div>
    <h2>Placeholder</h2>
  </div>
);

class ConsumerMyNobulSubMyNobulRoutes extends PureComponent {
  render() {
    return (
      <Switch>
        <Route
          exact
          path={MyNobulRoutes.url.root}
          component={dualUserTypeScene({
            consumerScene: MyNobulRoutes.ConsumerJobs,
            agentScene: MyNobulRoutes.AgentOffers
          })}
        />
        <Route
          path={MyNobulRoutes.url.settings}
          component={dualUserTypeScene({
            consumerScene: MyNobulRoutes.ConsumerSettings,
            agentScene: MyNobulRoutes.AgentSettings
          })}
        />
        <Route
          path={MyNobulRoutes.url.consumerJobOffers}
          component={MyNobulRoutes.ConsumerJobOffers}
        />
        <Route
          path={MyNobulRoutes.url.offerDetails}
          component={dualUserTypeScene({
            // consumerScene: MyNobulRoutes.ConsumerProposalDetails,
            consumerScene: MyNobulRoutes.ConsumerOfferDetails,
            agentScene: MyNobulRoutes.AgentOfferDetails
          })}
        />
        <Route
          path={MyNobulRoutes.url.consumerJobDetails}
          component={MyNobulRoutes.ConsumerJobDetails}
        />
        <Route
          path={MyNobulRoutes.url.jobs}
          component={dualUserTypeScene({
            consumerScene: MyNobulRoutes.ConsumerJobs,
            agentScene: Placeholder
          })}
        />
        <Route
          path={MyNobulRoutes.url.offers}
          component={dualUserTypeScene({
            consumerScene: MyNobulRoutes.ConsumerOffers,
            agentScene: MyNobulRoutes.AgentOffers
          })}
        />
        <Route
          path={MyNobulRoutes.url.events}
          component={dualUserTypeScene({
            consumerScene: MyNobulRoutes.ConsumerViewMyEvents,
            agentScene: MyNobulRoutes.AgentViewMyEvents
          })}
        />
        <Route
          path={MyNobulRoutes.url.myFavorites}
          component={dualUserTypeScene({
            consumerScene: MyNobulRoutes.ConsumerMyFavorites,
            agentScene: Placeholder
          })}
        />
        <Route
          path={MyNobulRoutes.url.subscriptions}
          component={dualUserTypeScene({
            consumerScene: Placeholder,
            agentScene: MyNobulRoutes.Subscriptions
          })}
        />
        <Route
          path={MyNobulRoutes.url.taggedListings}
          component={dualUserTypeScene({
            consumerScene: MyNobulRoutes.ConsumerViewTaggedListings,
            agentScene: Placeholder
          })}
        />

        <Route
          path={MyNobulRoutes.url.notifications}
          component={dualUserTypeScene({
            consumerScene: MyNobulRoutes.Notifications,
            agentScene: MyNobulRoutes.Notifications
          })}
        />
        <Route
          path={MyNobulRoutes.url.generateAgreement}
          component={MyNobulRoutes.GenerateAgreement}
        />
        <Route
          exact
          path={MyNobulRoutes.url.contractDefault}
          component={MyNobulRoutes.Contracts}
        />
        <Route component={MyNobulRoutes.NotFound} />
      </Switch>
    );
  }
}

export default withRouter(ConsumerMyNobulSubMyNobulRoutes);
