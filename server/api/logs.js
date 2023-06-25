import { PrismaClient } from "@prisma/client"

export default defineEventHandler(async(event) => {
    const client = new PrismaClient();

    return await client.logs.findMany({})
})