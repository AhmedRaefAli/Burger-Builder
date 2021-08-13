import React, { Component } from 'react';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axiosInstance';
import Input from '../../../components/UI/Input/Input';
import  {withRouter} from 'react-router-dom';
import  * as actions from "../../../store/actions/index";
import { connect } from 'react-redux';


class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation:{
                    require:true
                },
                valid:false,
                touched: false
            },
            mobileNumber: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Number'
                },
                value: '',
                validation:{
                    require:true
                },
                valid:false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'adress'
                },
                value: '',
                validation:{
                    require:true
                },
                valid:false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation:{
                    require:true,
                    minLength: 5,
                    maxLength: 5
                },
                valid:false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                validation:{
                    require:false,
                },
                value: 'fastest',
                valid: true
            }
        },
        formIsValid: false
    }

    orderHandler = ( event ) => {
        if (this.props.userID==null)
        {
            this.props.history.replace("/auth");   
        }
        else{
            event.preventDefault();
            const formData = {};
            for (let formElementIdentifier in this.state.orderForm) {
                formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
            }
            
            let order = {
                ingredients: this.props.ingredients,
                price: this.props.price,
                deliveryMethod:formData.deliveryMethod,
                zipCode:formData.zipCode,
                street:formData.street,
                mobileNumber:formData.mobileNumber,
                name:formData.name,
                userID:this.props.userID
            }
            this.props.onOrderBurger(order, this.props.token)
        }
    }


    checkValidity(value, rules) {
        let isValid = true;
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = { 
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    render () {

        
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
    
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if ( this.props.loading ) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        Tprice: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        userID: state.auth.userId,
        token:state.auth.token
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: ( orderData ,token ) => dispatch(actions.purchaseBurger( orderData,token))
    };
};


const WRContactData = withRouter(ContactData);
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(WRContactData, axios));