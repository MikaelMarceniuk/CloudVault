import { config } from 'dotenv'
import z from 'zod'

config()

const envSchema = z.object({
  PORT: z.coerce.number().min(1),
  DISCORD_CLIENT_ID: z.string().min(1),
  DISCORD_SECRET: z.string().min(1),
})

const envParsed = envSchema.safeParse(process.env)

if (!envParsed.success) {
  console.error('Missing env variables: ', envParsed.error.format())
  process.exit(1)
}

const env = envParsed.data

export default env
