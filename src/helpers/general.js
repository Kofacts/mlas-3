const moment = require('moment');

export function toLocal (datetime) {
    return moment(datetime).utc(true).local()
}

export function toUTC (datetime) {
    return moment(datetime).utc(true)
}

export function fromNow (datetime) {
    return moment(datetime).utc(true).local().fromNow();
}
export function randomString(length = 16, number = false) {
    var result = '';
    var characters = number ? "1234567890" : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export function handleApiError(vm, error, message = 'Failed to perform action. Please try again.') {
    message = error && error.data && error.data.message ? error.data.message : message;
    if (error && error.data && error.status === 422) {
        let errors = error.data;
        Object.values(errors).forEach(function(obj) {
            vm.errors.add({
                field: obj.field,
                msg: obj.message
            });
            vm.$toast.error(obj.message, {
                position: "top-right",
                duration: 2000
            });
        }, vm);
    }
        vm.$toast.error(message, {
            position: "top-right",
            duration: 3000
        });

}

function replaceQueryParam(param, newval, search) {
    var questionIndex = search.indexOf('?');

    if (questionIndex < 0) {
        search = search + '?';
        search = search + param + '=' + newval;
        return search;
    }

    var regex = new RegExp("([?;&])" + param + "[^&;]*[;&]?");
    var query = search.replace(regex, "$1").replace(/&$/, '');

    var indexOfEquals = query.indexOf('=');

    return (indexOfEquals >= 0 ? query + '&' : query + '') + (newval ? param + '=' + newval : '');
}

export function getPaginationData(data, moreParams) {
    let current_url = window.location.href;
    for (var key in moreParams) {
        current_url = replaceQueryParam(key, moreParams[key], current_url);
    }
    console.log(current_url);

        return {
            'total': data.total,
            'per_page': data.perPage,
            'current_page': data.page,
            'last_page': data.lastPage,
            'next_page_url': data.page > 1 ? replaceQueryParam('page', data.page, current_url) : null,
            'prev_page_url': data.page != data.lastPage ? replaceQueryParam('page', data.page - 1, current_url) : null,
            'from': ((parseInt(data.page) * parseInt(data.perPage)) - parseInt(data.perPage)) + 1,
            'to': parseInt(data.page) * parseInt(data.perPage)
        };

}
