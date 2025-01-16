import { Router } from 'express'
import { tourController } from './tour.controller'
import { upload } from '../../utils/fileUploadHelpers'

const tourRouter = Router()

tourRouter.post('/create-tour',upload.single("file"), tourController.createTour)
tourRouter.get('/', tourController.getTour)
tourRouter.get('/schedule/:id', tourController.getNextSchedule)
tourRouter.get('/:id', tourController.getSingleTour)

tourRouter.patch('/:id', tourController.updateTour)
tourRouter.delete('/:id', tourController.deleteTour)

export default tourRouter
