import prisma from '~/server/utils/prisma.js'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const response = {
        success: false,
        data: {},
        message: 'Log created successfully'
    }

    try {
        const user = event.context.auth;
        const log = await prisma.logs.create({
            data: {
                ...body,
                user_id: user.id
            }
        })

        response.success = true;
        response.data = log;
    } catch (e) {
        response.message = 'something went wrong!!: ' + e.message;

        throw createError({
            statusCode: 400,
            message: response.message,
            data: response,
        })
    }


    return response;
})