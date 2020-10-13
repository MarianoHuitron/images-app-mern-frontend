import { simpleFetch, tokenFetch } from "../../services/fetch";


describe('Testing fetch', () => {
    
    let token = '';

    test('simpleFetch should works', async () => {
        const resp = await simpleFetch('user/login', { email: 'test@test.com', password: '123456' }, 'POST');
        expect( resp instanceof Response ).toBe(true);

        const body = await resp.json();
        expect( body.ok ).toBe(true);

        token = body.token;
    });

    test('tokenFetch should works', async () => {
        localStorage.setItem('token', token);

        const resp = await tokenFetch('user/renew', {});
        const body = await resp.json();
        
        expect( body.ok ).toBe(true);
    })
    
    

})
