import dotenv from 'dotenv'
import path from 'path'
// dotenv.config({path : path.join(process.cwd(), ".env")})
dotenv.config({ path: path.join((process.cwd(), '.env')) })

export default {
  dataBase_url: process.env.DATABASE_URL,
  port: process.env.PORT,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
}
