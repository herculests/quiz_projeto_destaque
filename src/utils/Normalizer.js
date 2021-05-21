class Normalizer {

    /**
     * @function
     * @param {string} text Text aim to be formatted.
     * @returns {string}
     * @description Removes the first space in text fields.
     */
    removesFirstSpace = text => {
        if (text === ' ') {
            return '';
        }

        return text;
    };

    /**
     * @function
     * @param {string} text Text aim to be formatted.
     * @returns {string}
     * @description Removes unnecessary spaces from the value.
     */
    removesMultiplesSpacesForOne = text => {
        try {
            return text.replace(/\s{2,}/g, ' ');
        } catch (error) {
            return text;
        }
    };

    /**
     * @function
     * @param {string} text Text aim to be formatted.
     * @returns {string}
     * @description Removes anything other than a number.
     */
    onlyNumbers = text => {
        try {
            return text.replace(/[^0-9]/g, '');
        } catch (error) {
            return text;
        }
    };

    /**
     * @function
     * @param {string} text Text aim to be formatted.
     * @returns {string}
     * @description Removes anything other than a number or letter.
     */
    onlyCharacters = text => {
        try {
            return text.replace(/[^a-zA-Zà-úÀ-Ú ]/g, '');
        } catch (error) {
            return text;
        }
    };

    /**
     * @function
     * @param {string} text Text aim to be formatted.
     * @returns {string}
     * @description Removes anything other than a number
     * or letter (no special characters).
     */
    onlyNumbersLetters = text => {
        try {
            return text.replace(/[^A-Za-z0-9]/g, '');
        } catch (error) {
            return text;
        }
    };

    /**
     * @function
     * @param {string} texto Text aim to be formatted.
     * @returns {string}
     * @description Put texts to uppercase.
     */
    toUpperCase = text => {
        try {
            return text.toUpperCase();
        } catch (error) {
            return text;
        }
    };

    /**
     * @function
     * @param {string} value Text aim to be formatted.
     * @returns {string}
     * @description Put the text to the standard without special characters and with uppercase.
     */
    defaultNormalizeWithUpercase = value => {
        let formatedValue = this.removesMultiplesSpacesForOne(value);
        formatedValue = this.onlyNumbersLetters(formatedValue);
        formatedValue = this.toUpperCase(formatedValue);
        return formatedValue;
    };

    /**
        * @function capitalizeFirtsLetter
        * @param {string} value -Text aim to be formatted.
        * @returns {string}
        * @description Put the first letter to be uppercase and the other lowercase.
    */
    capitalizeFirtsLetter = value => value
        .toLowerCase()
        .replace(
            /([^a-zà-ú]|^)([a-z])(?=[a-z]{2})/g,
            (_, g1, g2) => g1 + g2.toUpperCase(),
        );


}

export default new Normalizer();
