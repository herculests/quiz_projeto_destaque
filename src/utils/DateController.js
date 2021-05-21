import moment from 'moment';

class DateController {

    /**
     * @function getPastDays
     * @param {number} pastDays How many past days
     * @param {string} format Date format
     * @returns {Array<string>} ["initial_date", "final_date"]
     * @description get a date of something in the past.
     */
    getPastDays = (pastDays, format) => {
        try {
            return moment().subtract(pastDays, 'days').format(format);
        } catch (error) {
            return moment().format('DD-MM-YYYY');
        }
    };

    /**
     * @function getPastDaysInterval
     * @param {number} pastDays How many past days
     * @param {string} format Date format
     * @returns {Array<string>} ["begining_past_day", "today"]
     * @description Gets an array of 2 dates, the first one
     * is about the some past day and the second one is today.
     */
    getPastDaysInterval = (pastDays, format) => {
        try {
            return [
                moment().subtract(pastDays, 'days').format(format),
                moment().format(format),
            ];
        } catch (error) {
            return [
                moment().format('DD-MM-YYYY'),
                moment().format('DD-MM-YYYY'),
            ];
        }
    };

    /**
     * @function getPastMonthInterval
     * @param {number} pastMonths How many months before
     * @param {string} format Date format
     * @returns {Array<string>} ["begining_past_month", "ending_past_month"]
     * @description Gets an array of 2 dates, the first one
     * is about the begining of a past month and the
     * second one is the end of the same month.
     */
    getPastMonthInterval = (pastMonths, format) => {
        try {
            return [
                moment().subtract(pastMonths, 'month').startOf('month').format(format),
                moment().subtract(pastMonths, 'month').endOf('month').format(format),
            ];
        } catch (error) {
            return [
                moment().format('DD-MM-YYYY'),
                moment().format('DD-MM-YYYY'),
            ];
        }
    };

    /**
     * @function getCurrentMonthInterval
     * @param {string} format Date format
     * @returns {Array<string>} ["begining_month", "ending_month"]
     * @description Gets an array of 2 dates, the first one
     * is about the begining of the month and the second one is the end.
     */
    getCurrentMonthInterval = format => {
        try {
            return [
                moment().startOf('month').format(format),
                moment().format(format),
            ];
        } catch (error) {
            return [
                moment().startOf('month').format('DD-MM-YYYY'),
                moment().format('DD-MM-YYYY'),
            ];
        }
    };

    /**
     * @function getBegingFromNow
     * @param {string} format Date format
     * @returns {Array<string>} ["big_bang", "today"]
     * @description Gets an array of 2 dates, the first one
     * is about the begining of the time and the second one is today.
     */
    getBeginingFromNow = (format = 'YYYY-MM-DD') => [
        moment('0001-01-01').format(format),
        moment().format(format),
    ];

}

export default new DateController();
