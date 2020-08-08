import { StolenBike } from '../models/index';
import { StolenBikeCreationAttributes } from '../models/stolenbike';

export default class StolenBikesService {
    async createNewCase(stolenBike: StolenBikeCreationAttributes) {
        return StolenBike.create(stolenBike);
    }

    async markFound(caseId: number) {
        return caseId;
    }

    async getAllStolenBikeCases() {
        return StolenBike.findAll();
    }
}