import supertest from "supertest";
import { createTestUser, removeTestUser, removeAllTestContact, createTestContact, getTestContact, removeAllTestAddresses, createTestAddress, getTestAddress} from "./test-util.js";  
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";


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

    logger.info(result.body)
    expect(result.status).toBe(200)
    expect(result.body.data.id).toBeDefined()
    expect(result.body.data.street).toBe('jalan test')
    expect(result.body.data.city).toBe('kota test')
    expect(result.body.data.province).toBe('provinsi test')
    expect(result.body.data.country).toBe('indonesia')
    expect(result.body.data.postal_code).toBe('12345')
})
})

