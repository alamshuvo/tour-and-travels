import { ITour } from './tour.interface'
import Tour from './tour.model'

const createTour = async (payload: ITour) => {
  const result = await Tour.create(payload)
  return result
}

const getTour = async (payload:Record<string, unknown>) => {
  console.log(payload,"payload main");


  const quearyObj = {...payload}
 
  const excludeFields = ['serchTerm']
  excludeFields.forEach((field)=>{
    delete quearyObj[field]
  })
  console.log(quearyObj,"quearyObj");
  const searchTerm = payload?.searchTerm   || '';

  const searchAbleFields = ['name','startLocation','locations'];
  // const result = await Tour.find({$or:[
  //   {name:{$regex:searchTerm,$options:"i"}},
  //   {startLocation:{$regex:searchTerm,$options:"i"}},
  //   {locations:{$regex:searchTerm,$options:"i"}}

  // ]})

  const searchQueary = Tour.find({
    $or: searchAbleFields.map((field)=>{
      return {
        [field]:{$regex:searchTerm,$options:"i"}
      }
    })
  })

  const result = await searchQueary.find(quearyObj)
  return result
}

const getSingleTour = async (id: string) => {
  const result = await Tour.findById(id)
  return result
}

const updateTour = async (id: string, data: Partial<ITour>) => {
  const result = await Tour.findByIdAndUpdate(id, data)
  return result
}

const deleteTour = async (id: string) => {
  const result = await Tour.findByIdAndDelete(id)
  return result
}

const getNextSchedule = async (id: string) => {
  console.log(id, 'services')

  const tour = await Tour?.getNextNearestStartDateAndEndDate(id)
  // const nextSchedule= tour?.getNextNearestStartDateAndEndDate()
  return {
    tour,
    // nextSchedule,
  }
}

export const tourServices = {
  createTour,
  getTour,
  getSingleTour,
  updateTour,
  deleteTour,
  getNextSchedule,
}
