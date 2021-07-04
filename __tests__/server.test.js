const supergoose = require('@code-fellows/supergoose');
const server = require('../src/server');
const request = supergoose(server.app);
const base64 = require('base-64');
describe('signin and signup requests', () => {
    test('sing up post request', async () => {
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
})