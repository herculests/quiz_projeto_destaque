import moment from 'moment-timezone';

class Formatter {

    /**
         * @function
         * @param {string} value Text aim to be formatted.
         * @returns {string}
         * @description Format the value passed to the date format
         * 99/99/9999. If formatting is not possible, the value
         * passed as a parameter without changes is returned.
     */
    formatDate = value => {
        try {
            return moment(value).format('DD/MM/YYYY');
        } catch (error) {
            return value;
        }
    };

    /**
         * @function formatDateWithTimezone
         * @param {string} date - Date to be formated.
         * @param {string} format - The date format.
         * @returns {string}
         * @description Format a date to a esired format.
    */
    formatDateWithTimezone = (date, format = 'DD/MM/YYYY HH:mm') => {
        if (date) {
            return moment(date, 'YYYY-MM-DDTHH:mm:ssZ').utc(moment.tz.guess()).format(format);
        }
        return '---';
    };

}

export default new Formatter();
