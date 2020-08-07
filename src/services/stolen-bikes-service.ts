export default class StolenBikesService {
    async createNewCase(stolenBike: object) {
        return JSON.stringify(stolenBike);
    }

    async maskFound(caseId: number) {
        return caseId;
    }

    async getAllStolenBikeCases() {
        return "All bikes";
    }
}