import { logger } from "../src/application/logging.js";
import { web } from "../src/application/web.js";
import { createTestUser, removeAllTestContact, removeTestUser, createTestContact, getTestContact, createManyTestContact} from "./test-util.js";
import supertest from "supertest";

describe("POST /api/contacts", function () {

    beforeEach(async () => {
        await createTestUser(); 
    });

    afterEach(async () => {
        await removeAllTestContact();
        await removeTestUser();

    });

    it("should can create contacts", async () => {
        const result = await supertest(web)  
        .post("/api/contacts")
        .set("Authorization", 'test')

        .send({
            first_name: 'test',
            last_name: 'test',
            email: 'test@pzn.com',
            phone: '123456789'
        })

        expect(result.status).toBe(200)
        expect(result.body.data.first_name).toBe('test')
        expect(result.body.data.last_name).toBe('test')
        expect(result.body.data.email).toBe('test@pzn.com')
        expect(result.body.data.phone).toBe('123456789')
        expect(result.body.data.id).toBeDefined()

    })


    it("should reject if request not valid", async () => {
        const result = await supertest(web)  
        .post("/api/contacts")
        .set("Authorization", 'test')

        .send({
            first_name: '',
            last_name: 'test',
            email: 'test',
            phone: '123456789'
        })

        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()

    })
})

describe("GET /api/contacts/:contactId", function () {
    
    beforeEach(async () => {
        await createTestUser();
        await createTestContact();
    });
    afterEach(async () => {
        await removeAllTestContact();
        await removeTestUser();
    })

    it('should can get contact', async() => {
        const testContact = await getTestContact()
        const result = await supertest(web)
        .get(`/api/contacts/` + testContact.id)
        .set('Authorization', 'test')

        logger.info(result.body)
        expect(result.status).toBe(200)
        expect(result.body.data.id).toBe(testContact.id)
        expect(result.body.data.first_name).toBe(testContact.first_name)
        expect(result.body.data.last_name).toBe(testContact.last_name)
        expect(result.body.data.email).toBe(testContact.email)
        expect(result.body.data.phone).toBe(testContact.phone)
    })
    it('should return 404 if contact id is not found', async() => {
        const testContact = await getTestContact()
        const result = await supertest(web)
        .get(`/api/contacts/` + testContact.id + 1)
        .set('Authorization', 'test')

        logger.info(result.body)
        expect(result.status).toBe(404)
    })

})

describe("PUT /api/contacts/:contactId", function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestContact();
    });
    afterEach(async () => {
        await removeAllTestContact();
        await removeTestUser();
    })

    it('should can update existing contact', async() => {
        const testContact = await getTestContact() 
        
        const result = await supertest(web)
        .put(`/api/contacts/` + testContact.id)
        .set('Authorization', 'test')
        .send({
            first_name: 'eko',
            last_name: 'khanedy',
            email: 'eko@pzn.com',
            phone: '123456798'
        })

        logger.info(result.body)
        expect(result.status).toBe(200)
        expect(result.body.data.id).toBe(testContact.id)
        expect(result.body.data.first_name).toBe('eko')
        expect(result.body.data.last_name).toBe('khanedy')
        expect(result.body.data.email).toBe('eko@pzn.com')
        expect(result.body.data.phone).toBe('123456798')
    })

    it('should can reject if contact id is invalid', async() => {
        const testContact = await getTestContact() 
        
        const result = await supertest(web)
        .put(`/api/contacts/` + testContact.id)
        .set('Authorization', 'test')
        .send({
            first_name: '',
            last_name: '',
            email: 'eko@pzn.com',
            phone: ''
        })

        logger.info(result.body)
       expect(result.status).toBe(400)
       expect(result.body.errors).toBeDefined()
    })

    it('should can reject if contact id is not found', async() => {
        const testContact = await getTestContact() 
        
        const result = await supertest(web)
        .put(`/api/contacts/` + testContact.id + 1)
        .set('Authorization', 'test')
        .send({
            first_name: 'eko',
            last_name: 'khanedy',
            email: 'eko@pzn.com',
            phone: '123456798'
        })

        logger.info(result.body)
       expect(result.status).toBe(404)
       expect(result.body.errors).toBeDefined()
    }) 
})


describe("DELETE /api/contacts/:contactId", function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestContact();
    });
    afterEach(async () => {
        await removeAllTestContact();
        await removeTestUser();
    })

    it('should can delete contact', async() => {
        let testContact = await getTestContact()
        const result = await supertest(web)
        .delete(`/api/contacts/` + testContact.id)
        .set('Authorization', 'test')


        logger.info(result.body)
        expect(result.status).toBe(200)
        expect(result.body.data).toBe('OK')

        testContact = await getTestContact()
        expect(testContact).toBeNull()

    })

    it('should reject if contact is not found', async() => {
        let testContact = await getTestContact()
        const result = await supertest(web)
        .delete(`/api/contacts/` + testContact.id + 1)
        .set('Authorization', 'test')

        expect(result.status).toBe(404)
    })
})

describe("GET /api/contacts", function () {
    beforeEach(async () => {
        await createTestUser();
        await createManyTestContact();
    });
    afterEach(async () => {
        await removeAllTestContact();
        await removeTestUser();
    })

    it('should can search without parameter', async() => {
        const result = await supertest(web)
        .get('/api/contacts')
        .set('Authorization', 'test')
        
        expect(result.status).toBe(200)

        expect(result.body.data.length).toBe(10)
        expect(result.body.paging.page).toBe(1)
        expect(result.body.paging.total_page).toBe(2)
        expect(result.body.paging.total_item).toBe(15)
    })
    it('should can search to page2', async() => {
        const result = await supertest(web)
        .get('/api/contacts')
        .query({
            page: 2
        })
        .set('Authorization', 'test')
        

        logger.info(result.body)
        expect(result.status).toBe(200)

        expect(result.body.data.length).toBe(5)
        expect(result.body.paging.page).toBe(2)
        expect(result.body.paging.total_page).toBe(2)
        expect(result.body.paging.total_item).toBe(15)
    })
    it('should can search to name', async() => {
        const result = await supertest(web)
        .get('/api/contacts')
        .query({
            name:'test 1' 
        })
        .set('Authorization', 'test')
        

        logger.info(result.body)
        expect(result.status).toBe(200)

        expect(result.body.data.length).toBe(6)
        expect(result.body.paging.page).toBe(1)
        expect(result.body.paging.total_page).toBe(1)
        expect(result.body.paging.total_item).toBe(6)
    });
    it('should can search to email', async() => {
        const result = await supertest(web)
        .get('/api/contacts')
        .query({
            email:'test1' 
        })
        .set('Authorization', 'test')
        

        logger.info(result.body)
        expect(result.status).toBe(200)

        expect(result.body.data.length).toBe(6)
        expect(result.body.paging.page).toBe(1)
        expect(result.body.paging.total_page).toBe(1)
        expect(result.body.paging.total_item).toBe(6)
    });
    it('should can search to phone', async() => {
        const result = await supertest(web)
        .get('/api/contacts')
        .query({
            phone:'1234567891' 
        })
        .set('Authorization', 'test')
        

        logger.info(result.body)
        expect(result.status).toBe(200)

        expect(result.body.data.length).toBe(6)
        expect(result.body.paging.page).toBe(1)
        expect(result.body.paging.total_page).toBe(1)
        expect(result.body.paging.total_item).toBe(6)
    });



})
