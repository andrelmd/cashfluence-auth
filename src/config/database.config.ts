import { registerAs } from '@nestjs/config'

export default registerAs('database', () => ({
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT || 5432,
  synchronize: process.env.DATABASE_SYNCHRONIZE,
  logging: process.env.DATABASE_LOGGING,
  debug: process.env.DATABASE_DEBUG
}))
