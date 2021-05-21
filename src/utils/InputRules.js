/**
 * @var nameRegex;
 * @description Regex to validate names.
 */
export const nameRegex = {
    // eslint-disable-next-line max-len
    pattern: /^[0-9A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]{3,}([0-9A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ])*([ ]+[0-9A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]{2,})/,
    message: 'rules.nameLastname',
};

/**
 * @var onlyWordsRegex;
 * @description Regex that validates fields that ca not have numbers or special characters.
 */
export const onlyWordsRegex = {
    pattern: /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ, ]+$/,
    message: 'rules.specialCharactersNumber',
};

/**
 * @var specialCharactersRegex;
 * @description Regex tha validates fields that can not have special characters.
 */
export const specialCharactersRegex = {
    pattern: /^[0-9A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ, ]+$/,
    message: 'rules.specialCharacters',
};

/**
 * @var addressRegex;
 * @description Regex that validates address fields.
 */
export const addressRegex = {
    pattern: /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]{2,}[0-9A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ/.,\-_ ]+$/,
    message: 'rules.specialCharacters',
};

/**
 * @var numberRegex;
 * @description Regex that validates address' number fields.
 */
export const numberRegex = {
    pattern: /^[0-9]+$/,
    message: 'rules.numberAddress',
};

/**
 * @var emailRegex;
 * @description Regex that validates e-mail fields.
 */
export const emailRegex = {
    type: 'email',
    message: 'rules.email',
};

/**
 * @var requiredField;
 * @description Validates required fields in AntDesign fields.
 */
export const requiredField = { required: true, message: 'rules.required' };

/**
 * @var minRule;
 * @description Validate if has at last 2 caracters.
 */
export const minRule = {
    min: 2,
    message: 'rules.min2',
};
