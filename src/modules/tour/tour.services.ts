import QueryBuilder from '../../builder/queryBuilder'
import { ITour } from './tour.interface'
import Tour from './tour.model'

const createTour = async (payload: ITour) => {
  const result = await Tour.create(payload)
  return result
}


  // console.log(payload, 'payload main')

  // const quearyObj = { ...payload }

  // const excludeFields = [
  //   'serchTerm',
  //   'page',
  //   'limit',
  //   'sortOrder',
  //   'sortby',
  //   'fields',
  // ]
  // excludeFields.forEach((field) => {
  //   delete quearyObj[field]
  // })
  // console.log(quearyObj, 'quearyObj')
  // const searchTerm = payload?.searchTerm || ''

  // const searchAbleFields = ['name', 'startLocation', 'locations']
  // // const result = await Tour.find({$or:[
  // //   {name:{$regex:searchTerm,$options:"i"}},
  // //   {startLocation:{$regex:searchTerm,$options:"i"}},
  // //   {locations:{$regex:searchTerm,$options:"i"}}

  // // ]})

  // const searchQueary = Tour.find()

  // //const result = await searchQueary.find(quearyObj)
  // const filterQueary = searchQueary.find(quearyObj)

  // const page = Number(payload?.page) || 1
  // const limit = Number(payload?.limit) || 10
  // const skiped = (page - 1) * limit
  // // const paginateQueary = await filterQueary.skip(skiped).limit(limit).exec()
  // const paginateQueary = filterQueary.skip(skiped).limit(limit)
  // let sortStr = '-price'
  // if (payload?.sortby && payload?.sortOrder) {
  //   const sortby = payload?.sortby
  //   const sortOrder = payload?.sortOrder
  //   // "-price" || "price"
  //   sortStr = `${sortOrder === 'desc' ? '-' : ''}${sortby}`
  // }

  // //  const result = await paginateQueary.sort(sortStr)
  // const sortQury = paginateQueary.sort(sortStr)
  // let fields = '-__v'
  // console.log(fields)

  // if (typeof payload?.fields === 'string') {
  //   fields = payload?.fields.split(',').join(' ')
  // }
  // const result = await sortQury.select(fields)
  const getTour = async (payload: Record<string, unknown>) => {
  const tours = new QueryBuilder(Tour.find(), payload)
    .search(['name', 'startLocation', 'locations'])
    .filter()
    .paginate()
    .sort()
    .select()
  const result = await tours.modelQuery
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
