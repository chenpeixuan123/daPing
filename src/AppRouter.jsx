import React, { Component } from 'react';
import { HashRouter, Route, Switch,Redirect} from 'react-router-dom';
import Start from 'pages/start/Start';
import Start2 from 'pages/start/Start2';
import DataMigration from 'pages/dataMigration/DataMigration';

import Backup from 'pages/backup/Backup';
import FinishPage from 'pages/finish/FinishPage';
import FinishPage2 from 'pages/finish/FinishPage2';
import FinishPage3 from 'pages/finish/FinishPage3';

// import MSCard from 'pages/msCard/MSCard';
import MSCard2 from 'pages/msCard2/MSCard';

// import MSWeb from 'pages/msWeb/MSWeb';
import MSWeb2 from 'pages/msWeb2/MSWeb';

import MSProv from 'pages/msProv/MSProv';
import MSProv2 from 'pages/msProv2/MSProv';

import MSProvold from 'pages/msProv2/MSProvold';

import MSTwoThree from 'pages/msTwoThree/MSTwoThree';
import MSTwoThree2 from 'pages/msTwoThree2/MSTwoThree';
import Branchdp from 'pages/branch/Branchdp';

import Branch from 'pages/branch/Branch';
import Branchold from 'pages/branch/Branchold';
import Branch0924 from 'pages/branch/Branch0924';
import Branch02 from 'pages/branch/Branch0922_1';

import Branch0927 from 'pages/branch/Branch0927';
import Customer from 'pages/customer/Customer';
import GSCard from 'pages/gsCard/GSCard';
import GSWeb from 'pages/gsWeb/GSWeb';
import GSProv from 'pages/gsProv/GSProv';

import NotFoundPage from 'pages/notFound/NotFoundPage';
import Test from 'pages/test/Test';




class AppRouter extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Branch} />
          <Route path="/cdksdh" component={MSTwoThree2} />
          <Route path="/MSTwoThree" component={MSTwoThree} />
          <Route path="/start" component={Start} />
          <Route path="/start2" component={Start2} />
          <Route path="/datamigration" component={DataMigration} />
          <Route path="/backup/:pid" component={Backup} />
          <Route path="/finish" component={FinishPage} />
          <Route path="/finish2" component={FinishPage2} />
          <Route path="/finish3" component={FinishPage3} />

          {/* <Route path="/mscard" component={MSCard} /> */}
          <Route path="/mscard2" component={MSCard2} />

          {/* <Route path="/msweb" component={MSWeb} /> */}
          <Route path="/msweb2" component={MSWeb2} />

           <Route path="/msprov" component={MSProv} />
          <Route path="/msprov2" component={MSProv2} />

          <Route path="/msprovold" component={MSProvold} />

          {/* <Route path="/ms23" component={MSTwoThree} />     */}
          <Route path="/ms232" component={MSTwoThree2} />

          <Route path="/t" component={Test} />
          <Route path="/branch" component={Branch} />

          <Route path="/branch_dp" component={Branchdp} />
          <Route path="/Branch02" component={Branch02} />
          {/*<Route path="/Branch09" component={Branch09} />*/}
          <Route path="/Branch0924" component={Branch0924} />
          <Route path="/customer" component={Customer} />
          <Route path="/gscard" component={GSCard} />
          <Route path="/gsweb" component={GSWeb} />
          <Route path="/gsprov" component={GSProv} />
          <Route path="/404" component={NotFoundPage} />
          <Redirect from="*" to="/404"/>
        </Switch>
      </HashRouter>
    );
  }
}

export default AppRouter;
