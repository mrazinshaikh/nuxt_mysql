import { PrismaClient } from "@prisma/client"

export default defineEventHandler(async (event) => {
    const client = new PrismaClient();
    const body = await readBody(event)

    const response = {
        success: false,
        data: {},
        message: 'Log created successfully'
    }

    try {
        const log = await client.logs.create({
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