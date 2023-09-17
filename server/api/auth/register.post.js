import crypto from 'node:crypto';
import prisma from '~/server/utils/prisma.js'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const response = {
        success: false,
        user: {},
        message: 'Register successfully'
    }

    try {
        const user = await prisma.users.findUnique({
            where: {
                email: body.email
            }
        })

        console.log(user)
        if(user){
            response.message = 'User already exist!!';
            return response;
        }
        
        if(body.password !== body.repassword){
            response.message = 'Password not match!!';
            return response;
        }

        const md5 = crypto.createHash('md5').update(body.repassword).digest("hex");
        const name = body.email.split('@')[0];

        const log = await prisma.users.create({
            data: {
                name: name,
                email: body.email,
                password: md5
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