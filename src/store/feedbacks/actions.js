import axios from 'axios';

const API = process.env.VUE_APP_BASE_URI;

export default {
    index({
                     commit
                 }, params = {}) {
        return new Promise((resolve, reject) => {
            let url = axios.get(`${API}/feedbacks`, { params });
            url
                .then(({
                           data
                       }) => {
                    commit('SET_FEEDBACKS', data);
                    resolve(data);
                })
                .catch(error => reject(error.response));
        });
    },
    fetchEntries({
              commit
          }, params) {
        return new Promise((resolve, reject) => {
            let url = axios.get(`${API}/feedback_entries`, {params:params});
            url
                .then(({
                           data:{data}
                       }) => {
                    commit('SET_ENTRIES', data.data );
                    resolve(data);
                })
                .catch(error => reject(error.response));
        });
    },
    fetchSingleMetric({
              commit
          }, id) {
        return new Promise((resolve, reject) => {
            let url = axios.get(`${API}/feedbacks/${id}/metrics`);
            url
                .then(({
                           data
                       }) => {
                    commit('SET_SINGLE_METRIC', data);
                    resolve(data);
                })
                .catch(error => reject(error.response));
        });
    },
    createUpdate({
                       commit
                   }, data) {
        return new Promise((resolve, reject) => {
            let url = data.id ? axios.put(`${API}/feedbacks/${data.id}`, data) : axios.post(`${API}/feedbacks`, data);
           url
                .then(({
                           data
                       }) => {
                    commit('SET_FEEDBACK', data);
                    resolve(data);
                })
                .catch(error => reject(error.response));
        });
    },
    fetchSingle({
                     commit
                 }, id) {
        return new Promise((resolve, reject) => {
            axios.get(`${API}/feedbacks/${id}`)
                .then(({
                           data
                       }) => {
                    commit('SET_FEEDBACK', data);
                    resolve(data);
                })
                .catch(error => reject(error.response));
        });
    },
}
