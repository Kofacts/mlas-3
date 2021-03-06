import axios from 'axios';

const API = process.env.VUE_APP_BASE_URI;

export default {
    fetchTemplates({
                             commit
                         }) {
        return new Promise((resolve, reject) => {
            axios.get(`${API}/templates`)
                .then(({
                           data: {
                               data
                           }
                       }) => {
                    commit('SET_TEMPLATES', data);
                    resolve(data);
                })
                .catch(error => reject(error.response));
        });
    },
    fetchPlans({
                       commit
                   }) {
        return new Promise((resolve, reject) => {
            axios.get(`${API}/plans`)
                .then(({
                           data: {
                               data
                           }
                       }) => {
                    commit('SET_PLANS', data);
                    resolve(data);
                })
                .catch(error => reject(error.response));
        });
    },
    fetchCountries({
                   commit
               }) {
        return new Promise((resolve, reject) => {
            axios.get(`${API}/countries`)
                .then(({
                           data
                       }) => {
                    commit('SET_COUNTRIES', data);
                    resolve(data);
                })
                .catch(error => reject(error.response));
        });
    },
    fetchRegions({
                   commit
               }, id) {
        return new Promise((resolve, reject) => {
            axios.get(`${API}/countries/${id}/regions`)
                .then(({
                           data
                       }) => {
                    commit('SET_REGIONS', data);
                    resolve(data);
                })
                .catch(error => reject(error.response));
        });
    },
    fetchCities({
                     commit
                 }, id) {
        return new Promise((resolve, reject) => {
            axios.get(`${API}/countries/${id}/cities`)
                .then(({
                           data
                       }) => {
                    commit('SET_CITIES', data);
                    resolve(data);
                })
                .catch(error => reject(error.response));
        });
    },
}
