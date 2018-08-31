import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {fakeApiCall_Login, fakeApiCall_Register} from '../services/index';
import {login_actions} from '../components/login/actions';
import {register_actions} from '../components/register/actions';

// worker Saga: will be fired on event of actions
function * LoginSaga(action) {
    try {
        console.log('Saga in use for login operation')
        const login = yield call(fakeApiCall_Login, action.payload);
        console.log('Login', login)
        yield put({type: login_actions.LoginActionSucceded, data: login});
    } catch (e) {
        console.log('Into catch block')
        yield put({type: login_actions.LoginActionFailed, message: e.message});
    }
}

function * RegisterSaga(action) {
    try {
        console.log('Saga in use for register operation')
        const register = yield call(fakeApiCall_Register, action.payload);
        console.log('Register', register)
        yield put({type: register_actions.RegisterActionSucceded, data: register});
    } catch (e) {
        console.log('Into catch block')
        yield put({type: register_actions.RegisterActionFailed, message: e.message});
    }
}

/*
    Alternatively you may use takeLatest.

    Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
    dispatched while a fetch is already pending, that pending fetch is cancelled
    and only the latest one will be run.
  */
function * mySaga() {
    console.log('Calling main saga');
    yield takeLatest(login_actions.LoginActionRequested, LoginSaga);
    yield takeLatest(register_actions.RegisterActionRequested, RegisterSaga);
}

export default mySaga;