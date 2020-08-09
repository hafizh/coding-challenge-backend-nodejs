import express from 'express'
import StolenBikeService from '../services/stolen-bikes-service'

const router = express.Router();
const stolenBikesService = new StolenBikeService();

router.get('/stolen-bikes', async (_, res, next) => {
    stolenBikesService.getAllStolenBikeCases()
        .then(result => res.send(result))
        .catch(next);
});

router.post('/stolen-bikes', async (req, res, next) => {
    const newCase = req.body;

    stolenBikesService.createNewCase(newCase)
        .then(result => res.status(201).send(result))
        .catch(next);
});

router.patch('/stolen-bikes/:id', async (req, res, next) => {
    stolenBikesService.markFound(parseInt(req.params.id))
        .then(result => res.status(200).send(result))
        .catch(next);
});

export default router;

