/**
 * This would be the home of our stores.
 */
import {
    global,
} from './global/store';

import {
    payments,
} from './payments/store';
import {
    feedbacks,
} from './feedbacks/store';
export default {
    modules: {
        global,
        payments,
        feedbacks,
    },
};
