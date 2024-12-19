import mongoose from 'mongoose'
import app from './app'
import config from './config'

async function server() {
  try {
    await mongoose.connect(config.dataBase_url as string)
    app.listen(config.port, () => {
      console.log('server running')
    })
  } catch (error) {
    console.log(error)
  }
}
console.log(config.dataBase_url, 'ekhan tekhe')

server()
