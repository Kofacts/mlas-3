import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export const feedbacks = {
    namespaced: true,
    state: {
        feedback: {},
        feedbacks: [],
        entries: [],
        single_metric: {},
    },
    actions,
    getters,
    mutations
}
