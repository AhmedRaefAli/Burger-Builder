import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import {Route, Switch , withRouter ,Redirect} from 'react-router-dom';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncCheckout = asyncComponent(()=>{
  return import('./containers/Checkout/Checkout');
});
const asyncOrders = asyncComponent(()=>{
  return import('./containers/Order/Order');
});
const asyncAuth = asyncComponent(()=>{
  return import('./containers/Auth/Auth');
});

class App extends Component {
  
  componentDidMount(){
    this.props.onTryAutoSinUp();
  }

  render() {
    let routes = (
          <Switch>
            <Route path="/auth" component={asyncAuth}/>     
            <Route exact path="/" ><BurgerBuilder/></Route>
            <Redirect to ="/"/>
          </Switch>
        );
    if(this.props.isAuthenticated){
      routes=(
          <Switch>             
            <Route path="/checkout" component={asyncCheckout} />
            <Route Route path="/orders" component={asyncOrders}/>
            <Route path="/logout" > <Logout/> </Route>
            <Route path="/auth" component={asyncAuth}/>        
            <Route exact path="/" ><BurgerBuilder/></Route>
            <Redirect to ="/"/>
          </Switch>);
    }

    return (
      <div >
        <Layout>
          <Switch>
            {routes}
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state)=>{
  return{
    isAuthenticated: state.auth.token !==null,
  }
}
const mapDispatchToProps = ( dispatch )=>{
  return{
    onTryAutoSinUp:()=>dispatch(actions.authCheckState())
  };
};

export default withRouter(connect (mapStateToProps,mapDispatchToProps)(App));
