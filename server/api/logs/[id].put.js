import prisma from '~/server/utils/prisma.js'

export default defineEventHandler(async (event) => {
    const logId = parseInt(event.context.params.id);
    const body = await readBody(event);

    const response = {
        success: false,
        data: {},
        message: ''
    }
    if (logId) {
        try {
            const log = await prisma.logs.update({
                where: {
                    id: logId
                },
                data: {
                    title: body.title,
                    description: body.description,
                    amount: body.amount,
                    category: body.category,
                    updated_at: new Date()
                }
            })

            response.success = true;
            response.data = log;
            response.message = 'Log updated successfully';
        } catch (e) {
            response.message = 'something went wrong!!: ' + e.message;

            throw createError({
                statusCode: 400,
                message: response.message,
                data: response,
            })
        }
    } else {
        response.message = "Missing required parameter log id"

        throw createError({
            statusCode: 400,
            message: response.message,
            data: response,
        })
    }

    return response
})