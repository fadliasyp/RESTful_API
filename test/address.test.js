import supertest from "supertest";
import { createTestUser, removeTestUser, removeAllTestContact, createTestContact, getTestContact, removeAllTestAddresses, createTestAddress, getTestAddress} from "./test-util.js";  
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";


describe("POST /api/contacts/:contactId/addresses", function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestContact();
    });
    afterEach(async () => {
        await removeAllTestAddresses();
        await removeAllTestContact();
        await removeTestUser();
    })   


    it("should can create new address", async () => {
        const testContact = await getTestContact();
        const result = await supertest(web)
        .post('/api/contacts/'+ testContact.id + '/addresses')
        .set('Authorization', 'test')

        .send({
            street: 'jalan test',
            city: 'kota test',
            province: 'provinsi test',
            country: 'indonesia',
            postal_code: '12345'
        })

        logger.info(result.body)
        expect(result.status).toBe(200)
        expect(result.body.data.id).toBeDefined()
        expect(result.body.data.street).toBe('jalan test')
        expect(result.body.data.city).toBe('kota test')
        expect(result.body.data.province).toBe('provinsi test')
        expect(result.body.data.country).toBe('indonesia')
        expect(result.body.data.postal_code).toBe('12345')

    })


    it("should can if adress in valid", async () => {
        const testContact = await getTestContact();
        const result = await supertest(web)
        .post('/api/contacts/'+ testContact.id + '/addresses')
        .set('Authorization', 'test')

        .send({
            street: 'jalan test',
            city: 'kota test',
            province: 'provinsi test',
            country: '',
            postal_code: '12345'
        })

        logger.info(result.body)
        expect(result.status).toBe(400)
       
    })
})

describe("GET /api/contacts/:contactId/addresses/:addressId", function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestContact();
        await createTestAddress()
    });
    afterEach(async () => {
        await removeAllTestAddresses();
        await removeAllTestContact();
        await removeTestUser();
    })
it('should can get address', async() => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();
    const result = await supertest(web)
    .get('/api/contacts/'+ testContact.id + '/addresses/' + testAddress.id)
    .set('Authorization', 'test')

    expect(result.status).toBe(200)
    expect(result.body.data.id).toBeDefined()
    expect(result.body.data.street).toBe(testAddress.street)
})


})