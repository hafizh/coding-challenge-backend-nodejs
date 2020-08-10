import { StolenBikeCreationAttributes, StolenBikeCase } from '../models/stolenbikecase';
import { PoliceOfficer } from '../models/policeofficer';
import { StolenBikeCaseNotFound } from '../exceptions';
import initDB from '../models';


initDB();

export default class StolenBikesService {

    async createNewCase(params: StolenBikeCreationAttributes) {
        const created = await StolenBikeCase.create(params)

        const freePoliceOfficer = await PoliceOfficer.findFreeOfficer();
        if (freePoliceOfficer) {
            console.log("Assigning to officer " + freePoliceOfficer)

            await freePoliceOfficer.assignCase(created);
        }

        return created.toJSON();
    }

    async markFound(caseId: number) {
        const caseFound = await StolenBikeCase.findByPk(caseId)
        
        if (caseFound) {
            await caseFound.update({status: 'resolved'});
            const availablePoliceOfficer = await caseFound.assignedTo;
            const nextCase = await StolenBikeCase.finsUnassignedCase();
            if (nextCase !== null) {
                console.log(availablePoliceOfficer);
                // availablePoliceOfficer.assignCase(nextCase)
            }
            
            return caseFound.toJSON();
        }

        throw new StolenBikeCaseNotFound(`No Case with ${caseId} found!`);
    }

    async getAllStolenBikeCases() {
        const cases = await StolenBikeCase.findAll()
        return cases.map((c: StolenBikeCase) => c.toJSON())
    }
}