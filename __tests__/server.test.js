const supergoose = require('@code-fellows/supergoose');
const server = require('../src/server');
const request = supergoose(server.app);
const base64 = require('base-64');
describe('signin and signup requests', () => {
    it('sing up post request', async () => {
        const result = await request.post('/signup').send({
            username: "balomari",
            password: "1234"
        });
        expect(result.status).toBe(201);
        expect(result.body.username).toBe("balomari");
    })
    it('Handles Signing in and tests middleware', async ()=>{
        const response = await request.post('/signin').set({"Authorization":"Basic YmFsb21hcmk6MTIzNA=="});
        expect(response.status).toEqual(200);
      });

      it('to test if its fails to log in as an invalid user in the signing in', async () => {
        const user = base64.encode("balommari:1234");
        const response = await request.post('/signin').set('Authorization', `Basic ${user}`)
        expect(response.status).toEqual(403)
      });

      it('to test if its fails to log in with wrong password in the signing in', async () => {
        const user = base64.encode("balomari:12344");
        const response = await request.post('/signin').set('Authorization', `Basic ${user}`)
        expect(response.status).toEqual(403)
        expect(response.body.password).not.toEqual('1993');
      })



})