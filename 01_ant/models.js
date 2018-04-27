import {dataInterfaccDetailLog, gcrList} from '../services/api';

export default {
    namespace: 'gcr',

    state: {
        list: [],
        currentUser: {},
    },

    effects: {
        *fetch({ payload, callback }, { call, put }) {
            const response = yield call(gcrList, payload);
            yield put({
                type: 'queryList',
                payload: response,
            });
            if (callback) callback();
        },
    },

    reducers: {
        queryList(state, action) {
            return {
                ...state,
                queryListData: action.payload,
            };
        },
    },
};
