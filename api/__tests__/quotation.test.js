const request = require('supertest')
const server = require('../server')

beforeAll(async () => {
    // Message output when test begin
    console.log('Initializing test right now...')
})

// close the server after each test
afterAll(() => {
    server.close();
    console.log('server turn down...')
});

describe('Starts the test', () => {
    test('Gets flight quotation route and finds registers', async () => {
        const response = await request(server).get('/v1/quotation/GRU/CDG');
        expect(response.status).toEqual(200);        
    })
   
})