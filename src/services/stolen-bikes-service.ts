import { StolenBike as stolenBike } from '../models/index';
import { StolenBikeCreationAttributes, StolenBike } from '../models/stolenbike';
import { StolenBikeCaseNotFound } from '../exceptions';

export default class StolenBikesService {
    async createNewCase(params: StolenBikeCreationAttributes) {
        const created = await stolenBike.create(params)
        return created.toJSON();
    }

    async markFound(caseId: number) {
        const caseFound = await stolenBike.findByPk(caseId)
        
        if (caseFound) {
            await caseFound.update({status: 'resolved'});
            return caseFound.toJSON();
        }

        throw new StolenBikeCaseNotFound(`No Case with ${caseId} found!`);
    }

    async getAllStolenBikeCases() {
        const cases = await stolenBike.findAll()
        return cases.map((c: StolenBike) => c.toJSON())
    }
}