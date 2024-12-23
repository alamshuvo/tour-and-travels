import { FilterQuery, Query } from 'mongoose'

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>
  public query: Record<string, unknown>
  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery
    this.query = query
  }
  search(searchAbleFields: string[]) {
    const searchTerm = this.query?.searchTerm || ''
    this.modelQuery = this.modelQuery.find({
      $or: searchAbleFields.map((field: any) => {
        return {
          [field]: { $regex: searchTerm, $options: 'i' },
        }
      }),
    } as FilterQuery<T>)
    return this
  }

  filter() {
    const queryObj = { ...this.query }
    const excludeFields = [
      'searchTerm',
      'page',
      'limit',
      'sortOrder',
      'sortby',
      'fields',
    ]
    excludeFields.forEach((field) => {
      delete queryObj[field]
    })
    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>)
    return this
  }
  paginate() {
    const page = Number(this?.query?.page) || 1
    const limit = Number(this?.query?.limit) || 10
    const skiped = (page - 1) * limit
    this.modelQuery = this.modelQuery.skip(skiped).limit(limit)
    return this
  }

  sort() {
    let sortStr = '-price'
    if (this.query?.sortby && this.query?.sortOrder) {
      const sortby = this?.query.sortby
      const sortOrder = this?.query.sortOrder
      // "-price" || "price"
      sortStr = `${sortOrder === 'desc' ? '-' : ''}${sortby}`
    }
    this.modelQuery = this.modelQuery.sort(sortStr)
    return this
  }

  select() {
    let fields = '-__v'
    if (this.query?.fields) {
      fields = (this.query?.fields as string)?.split(',').join(' ')
    }
    this.modelQuery = this.modelQuery.select(fields)
    return this
  }
}

export default QueryBuilder
