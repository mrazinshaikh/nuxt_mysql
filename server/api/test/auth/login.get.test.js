import { expect, it } from 'vitest'

async function checkLogin() {
    return await fetch('http://localhost:3000/api/auth/login', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: 'razinshaikh8732@gmail.com',
            password: 'Razin9963'
        })
    })
    .then(o => o.json())
    // .then(async (o) => {
    //     console.log('%cFetch Api then','font-size:30px; color:#ff0000;')
    //     console.log(await o.json())
    //     return await o.json();
    // })
}

it('check login get endpoint', async() => {
    const response = await checkLogin();
    console.log('%cTEst 1','font-size:30px; color:#ff0000;')
    console.log(response)
    expect(response.success).toBeTruthy()
})