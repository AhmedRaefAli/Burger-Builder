import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('UserID');
    return{
        type:actionTypes.AUTH_LOGOUT
    };
}

export const checkAuthTimeOut = (expireTime)=>{
    return dispatch =>{
        setTimeout(()=>{
            dispatch(logout());
        },expireTime*1000)
    };
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password
        };
        let url = 'http://localhost:8080/users/post-user';
        if (!isSignup) {
            url = 'http://localhost:8080/users/get-user';
        }
        axios.post(url, authData)
            .then(response => {
                const expirationDate= new Date(new Date().getTime() +response.data.expiresIn*1000);
                localStorage.setItem('token',response.data.token);
                localStorage.setItem("expirationDate",expirationDate);
                localStorage.setItem("UserID",response.data.user._id);
                dispatch(authSuccess(response.data.token, response.data.user._id));
                dispatch (checkAuthTimeOut(response.data.expiresIn));
            })
            .catch(err => {
                dispatch(authFail(err));
            });
    };
};

export const setAuthRedirectPath=(path)=>{
    return{
        type:actionTypes.SET_AUTH_REDIRECT_PATH,
        path:path
    };
}

export const authCheckState = ()=>{
    return dispatch =>{
        const token = localStorage.getItem('token');
        if(!token){
            dispatch (logout());
        }
        else{
            const expirationDate =new Date( localStorage.getItem('expirationDate'));
            if (expirationDate < new Date()){
                dispatch(logout());
            }
            else{
                const UserID = localStorage.getItem('UserID');
                dispatch(authSuccess(token,UserID));
                dispatch (checkAuthTimeOut((expirationDate.getTime()-new Date().getTime())/1000));

            }
            
        }
    }
}