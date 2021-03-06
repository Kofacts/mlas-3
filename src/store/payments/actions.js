import axios from 'axios';

const API = process.env.VUE_APP_BASE_URI;

export default {
    verify({commit}, data) {
        return new Promise((resolve, reject) => {
            axios.post(`${API}/payments/callback`, data)
                .then(({
                           data
                       }) => {
                    resolve(data);
                })
                .catch(error => reject(error.response));
        });
    },

}
