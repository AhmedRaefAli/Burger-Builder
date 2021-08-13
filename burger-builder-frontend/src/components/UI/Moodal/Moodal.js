import React , {Component} from 'react';
import classes from './Moodal.css';
import Auux from '../../../hoc/Auux/Auux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component{
    shouldComponentUpdate (nextProps, nextState){
        return nextProps.show !==this.props.show || nextProps.children!==this.props.children        ;
    }

    render(){
        return(
            <Auux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'/*show or hidden it  */
                    }}>
                    {this.props.children}
                </div>
            </Auux>
        )
    }
} 

export default Modal;