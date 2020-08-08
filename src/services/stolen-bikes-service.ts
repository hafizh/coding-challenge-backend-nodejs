import { StolenBike } from '../models/index';
import { StolenBikeCreationAttributes } from '../models/stolenbike';

export default class StolenBikesService {
    async createNewCase(stolenBike: StolenBikeCreationAttributes) {
        return await StolenBike.create(stolenBike);
    }

    async markFound(caseId: number) {
        const caseFound = await StolenBike.findByPk(caseId)
        
        if (caseFound) {
            caseFound.update("status", "resolved");
        }

        return caseId;
    }

    async getAllStolenBikeCases() {
        return await StolenBike.findAll();
    }
}