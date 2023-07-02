import prisma from '~/server/utils/prisma.js'

export default defineEventHandler(async (event) => {
    return await prisma.logs.findMany({
        orderBy: {
            id: "desc"
        }
    })
})