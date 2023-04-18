import moment from "moment";
export function  useTimeDifference() {

    function timeDifference(previous) {
        let current = moment();
        let diff = current.diff(previous, 'seconds');
        if (diff < 60) {
            return diff + ' seconds ago';
        } else if (diff < 3600) {
            if (Math.floor(diff / 60) === 1) {
                return Math.floor(diff / 60) + ' minute ago';
            } else {
                return Math.floor(diff / 60) + ' minutes ago';
            }
           
        } else if (diff < 86400) {
            if (Math.floor(diff / 3600) === 1) {
                return Math.floor(diff / 3600) + ' hour ago';
            } else {
                return Math.floor(diff / 3600) + ' hours ago';
            }
        } else if (diff < 2592000) {
            if (Math.floor(diff / 86400) === 1) {
                return Math.floor(diff / 86400) + ' day ago';
            } else {
                return Math.floor(diff / 86400) + ' days ago';
            }
        } else if (diff < 31104000) {
            if (Math.floor(diff / 2592000) === 1) {
                return Math.floor(diff / 2592000) + ' month ago';
            } else {
                return Math.floor(diff / 2592000) + ' months ago';
            }
        } else {
            return Math.floor(diff / 31104000) + ' years ago';
        }
    }

    return {
        timeDifference
    }
}
    

