import _ from 'lodash'
import jwt from 'jsonwebtoken'
import crypto from 'node:crypto';
import prisma from '~/server/utils/prisma.js'

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

        const $config = useRuntimeConfig()
        const privateKey = $config.JWT_PRIVATE_KEY
        const md5 = crypto.createHash('md5').update(body.password).digest("hex");

        if (md5 === user.password) {
            response.success = true;
            response.user = _.omit(user, ['password', 'updated_at']);
            response.token = jwt.sign(response.user, privateKey, { expiresIn: '12h' });
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