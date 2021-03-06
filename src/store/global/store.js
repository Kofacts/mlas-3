import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export const global = {
    namespaced: true,
    state: {
        templates: [],
        plans: [],
        cities: [],
        regions: [],
        countries: [],
    },
        actions,
        getters,
        mutations
}
