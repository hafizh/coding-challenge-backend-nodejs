import express from 'express'
import StolenBikeService from '../services/stolen-bikes-service'

const router = express.Router();
const stolenBikesService = new StolenBikeService();

router.get('/stolen-bikes', async (_, res) => {
    const result = await stolenBikesService.getAllStolenBikeCases()
    res.send('GET stolen bike case' + result);
});

router.post('/stolen-bikes', async (req, res) => {
    const stolenBike = req.body;

    const result = await stolenBikesService.createNewCase(stolenBike)
    res.status(201).send('POST stolen bike case ' + result);
});

router.patch('/stolen-bikes/:id', async (req, res) => {
    const result = await stolenBikesService.maskFound(parseInt(req.params.id))

    res.status(200).send('PATCH stolen bike case resolved ' + result);
});

export default router;

