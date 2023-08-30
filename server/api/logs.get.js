import prisma from '~/server/utils/prisma.js'

export default defineEventHandler(async (event) => {
    const user = event.context.auth;

    return await prisma.logs.findMany({
        where: {
            user_id: user.id
        },
        orderBy: {
            id: "desc"
        }
    })
})