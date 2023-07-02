import prisma from '~/server/utils/prisma.js'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const response = {
        success: false,
        data: {},
        message: 'Log created successfully'
    }

    try {
        const log = await prisma.logs.create({
            data: body
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