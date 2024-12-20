import { Router } from 'express'
import { tourController } from './tour.controller'

const tourRouter = Router()

tourRouter.post('/create-tour', tourController.createTour)
tourRouter.get('/', tourController.getTour)
tourRouter.get('/schedule/:id', tourController.getNextSchedule)
tourRouter.get('/:id', tourController.getSingleTour)

tourRouter.patch('/:id', tourController.updateTour)
tourRouter.delete('/:id', tourController.deleteTour)

export default tourRouter
