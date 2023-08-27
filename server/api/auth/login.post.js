import prisma from '~/server/utils/prisma.js'
import crypto from 'node:crypto';
import _ from 'lodash'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const response = {
        success: false,
        user: {},
        message: 'Login successfully'
    }

    try {
        const user = await prisma.users.findUnique({
            where: {
                email: body.email
            }
        })

        const md5Old = crypto.createHash('md5').update(body.password).digest("hex");
        if (md5Old === user.password) {
            response.success = true;
            response.user = _.omit(user, ['password', 'updated_at']);
        }
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