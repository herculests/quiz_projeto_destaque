export default class userData {

    constructor(response) {
        this.name = response.name;
        this.email = response.email;
        this.questionnaires = response.questionnaires;
        this.id = response.id;
        this.stars = response.stars;
    }

}
