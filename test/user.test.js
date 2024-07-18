import supertest from "supertest";
import {web} from "../src/application/web.js";
import {logger} from "../src/application/logging.js";
import {createTestUser, getTestUser, removeTestUser, removeAllTestContact} from "./test-util.js";
import bcrypt from "bcrypt";
import e from "express";

describe('POST /api/users', function () {

    afterEach(async () => {
        await removeTestUser();
    })

    it('should can register new user', async () => {
        const result = await supertest(web)
            .post('/api/users')
            .send({
                username: 'test',
                password: 'rahasia',
                name: 'test'
            });

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("test");
        expect(result.body.data.password).toBeUndefined();
    });

    it('should reject if request is invalid', async () => {
        const result = await supertest(web)
            .post('/api/users')
            .send({
                username: '',
                password: '',
                name: ''
            });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('should reject if username already registered', async () => {
        let result = await supertest(web)
            .post('/api/users')
            .send({
                username: 'test',
                password: 'rahasia',
                name: 'test'
            });

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("test");
        expect(result.body.data.password).toBeUndefined();

        result = await supertest(web)
            .post('/api/users')
            .send({
                username: 'test',
                password: 'rahasia',
                name: 'test'
            });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });
});

describe('POST /api/users/login', function () {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUser();
    });

    it('should can login', async () => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                username: "test",
                password: "rahasia"
            });

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.token).toBeDefined();
        expect(result.body.data.token).not.toBe("test");
    });

    it('should reject login if request is invalid', async () => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                username: "",
                password: ""
            });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });
    it('should reject login if password is wrong', async () => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                username: "test",
                password: "salah"
            });

        logger.info(result.body);

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });
})

describe('GET /api/users/current', function () {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUser();
    });

    it('should can get current user', async () => {
        const result = await supertest(web)
            .get('/api/users/current')
            .set('Authorization', 'test');


            logger.info(result.body);
            expect(result.status).toBe(200);
            expect(result.body.data.username).toBe("test");
            expect(result.body.data.name).toBe("test");
        }) 

        it('should reject if token invalid', async () => {
            const result = await supertest(web)
                .get('/api/users/current')
                .set('Authorization', 'salah');
    
                expect(result.status).toBe(401);
                expect(result.body.errors).toBeDefined();
        })
    
})  

describe('PAtCH /api/users', function () {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUser();
    });

    it('should can update current user', async () => {
        const result = await supertest(web)
            .patch('/api/users/current')
            .set('Authorization', 'test')
            .send({
                name: 'Eko',
                password: 'rahasiaLagi'
            });
            expect(result.status).toBe(200);
            expect(result.body.data.username).toBe("test");
            expect(result.body.data.name).toBe("Eko");
    
            const user = await getTestUser();
            expect(await bcrypt.compare('rahasiaLagi', user.password)).toBe(true);
    });

    it('should can update user name', async () => {
        const result = await supertest(web)
            .patch('/api/users/current')
            .set('Authorization', 'test')
            .send({
                name: 'Eko',
               
            });
            expect(result.status).toBe(200);
            expect(result.body.data.username).toBe("test");
            expect(result.body.data.name).toBe("Eko");
    });
    it('should can update user password', async () => {
        const result = await supertest(web)
            .patch('/api/users/current')
            .set('Authorization', 'test')
            .send({
                password: 'rahasiaLagi'
            });
            expect(result.status).toBe(200);
            expect(result.body.data.username).toBe("test");
            expect(result.body.data.name).toBe("test");
    
            const user = await getTestUser();
            expect(await bcrypt.compare('rahasiaLagi', user.password)).toBe(true);
    });

    it('should can update user not valid', async () => {
        const result = await supertest(web)
            .patch('/api/users/current')
            .set('Authorization', 'salah')
            .send({
                password: ''
            });
            expect(result.status).toBe(401);
            expect(result.body.errors).toBeDefined();   

    }); 
})

describe('DELETE /api/users/logout', () => {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUser();
    });

    it('should can logout', async () => {
        const result = await supertest(web)
            .delete('/api/users/logout')
            .set('Authorization', 'test');
            expect(result.status).toBe(200);
            expect(result.body.data).toBe("OK");

            const user = await getTestUser();
            expect(user.token).toBeNull();
    });

    it('should reject if token invalid', async () => {
        const result = await supertest(web)
            .delete('/api/users/logout')
            .set('Authorization', 'salah');
            expect(result.status).toBe(401);
            expect(result.body.errors).toBeDefined();
    });

})

describe('Post / api/contacts', () => {

    beforeEach(async () => {
        await createTestUser();
    });
    afterEach(async () => {
        await removeAllTestContact();
        await removeTestUser();
    });
    it('should can create contact', async () => {
        const result = await supertest(web)
            .post('/api/contacts')
            .set('Authorization', 'test')
            .send({
                first_name: 'test',
                last_name: 'test',
                phone: '081234567890',
                email: 'test@pzn.com'
            })
            expect(result.status).toBe(200);
            expect(result.body.data.id).toBeDefined()
            expect(result.body.data.first_name).toBe("test");
            expect(result.body.data.last_name).toBe("test");
            expect(result.body.data.phone).toBe("081234567890");
            expect(result.body.data.email).toBe("test@pzn.com");
    });

})