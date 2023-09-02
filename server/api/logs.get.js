import prisma from '~/server/utils/prisma.js'

export default defineEventHandler(async (event) => {
    const user = event.context.auth;

    const query = getQuery(event);
    let page = 1;
    let totalPage = 1;
    const limit = 5;
    
    if (query?.page || page == 1) {
        page = query.page || 1;
        const totalLogs = await prisma.logs.count({
            where: {
                user_id: user.id
            },
            _count: {
                _all: true
            }
        })

        if(totalLogs > 0){
            totalPage = Math.ceil(totalLogs/limit);
        }
    }

    const offset = (limit * page) - limit    
    const logs = await prisma.logs.findMany({
        where: {
            user_id: user.id
        },
        orderBy: {
            id: "desc"
        },
        take: limit,
        skip: offset
    })

    return {
        logs,
        totalPage,
    }
})