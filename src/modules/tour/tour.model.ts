import { model, Schema } from 'mongoose'
import TTourModel, { ITour, ITourMethods } from './tour.interface'

const tourSchema = new Schema<ITour, TTourModel, ITourMethods>({
  name: {
    type: String,
    required: true,
  },
  durationHours: {
    type: Number,
    required: true,
  },
  averageRating: {
    type: Number,
    default: 5,
  },
  price: {
    type: Number,
    required: true,
  },
  avaliableSeats: {
    type: Number,
    required: true,
  },
  coverImage: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  startDates: [Date],
  startLocation: {
    type: String,
  },
  locations: {
    type: [String],
  },
  slug: {
    type: String,
  },
})
// tourSchema.methods.getNextNearestStartDateAndEndDate = function () {
//  const today = new Date();
//  const futureDates = this.startDates.filter((startDate:Date)=>{
//   return startDate>today
//  })

//  futureDates.sort((a:Date,b:Date)=>{
//   return a.getTime()-b.getTime()
//  })

//  const nearestStartDate = futureDates[0];
//  const estimatedEndDate  = new Date(nearestStartDate.getTime() + this.durationHours*60*60*1000)

//  return {nearestStartDate,estimatedEndDate}
// }
tourSchema.static(
  'getNextNearestStartDateAndEndDate',
  async function getNextNearestStartDateAndEndDate(id: string) {
    const today = new Date()
    // console.log(this.startDates)
    console.log(this, 'static')
    const tour = await Tour.findById(id)

    const futureDates = tour?.startDates?.filter((startDate: Date) => {
      return startDate > today
    })
    console.log(futureDates)

    futureDates?.sort((a: Date, b: Date) => {
      return a?.getTime() - b?.getTime()
    })
    if (futureDates?.length === 0) {
      throw new Error('No future dates available')
    }
    const nearestStartDate = futureDates[0]
    const estimatedEndDate = new Date(
      nearestStartDate?.getTime() + this?.durationHours * 60 * 60 * 1000
    )

    return { nearestStartDate, estimatedEndDate }
  }
)
const Tour = model<ITour, TTourModel>('Tour', tourSchema)
export default Tour
