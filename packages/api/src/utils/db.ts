import { PrismaClient } from '@prisma/client'

export const db = new PrismaClient()

export const connectToDatabase = async () => {
  try {
    await db.$connect()
    console.log('Connected to database!')
  } catch (err) {
    console.log('Error connecting to database: ', err)
    process.exit(1)
  }
}
