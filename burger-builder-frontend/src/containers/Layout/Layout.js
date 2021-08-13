import React , {Component} from 'react';
import Auux from '../../hoc/Auux/Auux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import classes from './Layout.css';
import SliderDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

class Layout extends Component{
    state ={
        showsideDrawer:false
    }
    sideDrawerCloseHandler=()=>{
        this.setState({showsideDrawer:false});
    }
    sideDrawerOpenHandler=()=>{
        this.setState(
            (prevState)=>{
                return {showsideDrawer: !prevState.showsideDrawer };
            });
    }

    render(){
        return(
            <Auux>
                <Toolbar
                    drawerToggleClicked={this.sideDrawerOpenHandler}
                    isAuth={this.props.isAuthenticated}
                />
                <SliderDrawer 
                    open = { this.state.showsideDrawer} 
                    closed={this.sideDrawerCloseHandler}
                    isAuth={this.props.isAuthenticated}
                />
                <main className={classes.Content}>
                    {this.props.children}
                </main>);
            </Auux>
        );
    }
}; 

const mapStateToProps = state => {
    return {
        userID: state.auth.id,
        isAuthenticated: state.auth.token !==null
    };
};

export default connect (mapStateToProps)(Layout);