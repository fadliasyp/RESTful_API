import supertest from "supertest"
import { web } from "../src/application/web.js";
import { removeTestUser, createTestUser, getTestUser} from "./test-util.js";
import { logger } from "../src/application/logging.js";
import bcrypt from "bcrypt";

describe('POST  /api/users', function () {

    afterEach(async () => {
        await removeTestUser();
    });
    

    it('should can register new users', async() => {
        const result = await supertest(web)
        .post('/api/users')
        .send({
           username: 'test',
           password: 'rahasia',
           name:'test'
        })

        logger.info(result.body)
        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe('test')
        expect(result.body.data.name).toBe('test')
        expect(result.body.data.password).toBeUndefined()
    })
    it('should reject if register new users', async() => {
        const result = await supertest(web)
        .post('/api/users')
        .send({
           username: '',
           password: '',
           name:''
        })

        logger.info(result.body)
        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    })

    it('should reject if double al ready register new users', async() => {
        let result = await supertest(web)
        .post('/api/users')
        .send({
           username: 'fadli',
           password: 'rahasia',
           name:'asyp'
        })

        logger.info(result.body)
        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe('fadli')
        expect(result.body.data.name).toBe('asyp')
        expect(result.body.data.password).toBeUndefined()

        result = await supertest(web)
        .post('/api/users')
        .send({
           username: 'fadli',
           password: 'rahasia',
           name:'asyp'
        })

        logger.info(result.body)
        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    })

})

describe('POST /api/users/login', function () {

    beforeEach(async () => {
        await createTestUser(); 
    });
    afterEach(async () => {
        await removeTestUser();
    });

    it('should can login users', async() => {
        const result = await supertest(web)
        .post('/api/users/login')
        .send({
           username: 'test',
           password: 'rahasia'
        })
        logger.info(result.body)
        expect(result.status).toBe(200)
        expect(result.body.data.token).toBeDefined()
        expect(result.body.data.token).not.toBe('test')
    })
    it('should can reject login users invalid', async() => {
        const result = await supertest(web)
        .post('/api/users/login')
        .send({
           username: '',
           password: 'rahasia'
        })
        logger.info(result.body)
        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    })
    it('should can reject if username is wrong', async() => {
        const result = await supertest(web)
        .post('/api/users/login')
        .send({
           username: 'salah',
           password: 'rahasia'
        })
        logger.info(result.body)
        expect(result.status).toBe(401)
        expect(result.body.errors).toBeDefined()
    })
    it('should can reject if password is wrong', async() => {
        const result = await supertest(web)
        .post('/api/users/login')
        .send({
           username: 'test',
           password: 'salah'
        })
        logger.info(result.body)
        expect(result.status).toBe(401)
        expect(result.body.errors).toBeDefined()
    })
})

describe('GET /api/users/current', function () {
    
    beforeEach(async () => {
        await createTestUser(); 
    });
    afterEach(async () => {
        await removeTestUser();
    });

    it('should can get current user', async() => {
        const result = await supertest(web)
        .get('/api/users/current')
        .set('Authorization', 'test')

        logger.info(result.body)
        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe('test')
        expect(result.body.data.name).toBe('test')
        
    })
    it('should reject if token not valid', async() => {
        const result = await supertest(web)
        .get('/api/users/current')
        .set('Authorization', 'salah')

        logger.info(result.body)
       expect(result.status).toBe(401)
       expect(result.body.errors).toBeDefined()
    })
})

describe('PATCH /api/users/curent', function () {
    
    beforeEach(async () => {
        await createTestUser(); 
    });
    afterEach(async () => {
        await removeTestUser();
    });

    it('should can update current user', async() => {
        const result = await supertest(web)
        .patch('/api/users/current')
        .set('Authorization', 'test')
        .send({
            name: 'asyp',
            password : "rahasiaLagi",
        })
        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe('test')
        expect(result.body.data.name).toBe('asyp')
       

        const user = await getTestUser()
        expect(await bcrypt.compare('rahasiaLagi', user.password)).toBe(true)
    })

    it('should can update current user name', async() => {
        const result = await supertest(web)
        .patch('/api/users/current')
        .set('Authorization', 'test')
        .send({
            name: 'eko',
            
        })
        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe('test')
        expect(result.body.data.name).toBe('eko')
       
    })

    it('should can update current user password', async() => {
        const result = await supertest(web)
        .patch('/api/users/current')
        .set('Authorization', 'test')
        .send({
            password : "rahasiaAgain",
        })
        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe('test')

        const user = await getTestUser()
        expect(await bcrypt.compare('rahasiaAgain', user.password)).toBe(true)
    })

    it('should can update current user invalid', async() => {
        const result = await supertest(web)
        .patch('/api/users/current')
        .set('Authorization', 'salah')
        .send({})
        expect(result.status).toBe(401)
        expect(result.body.errors).toBeDefined()
    })
})

describe('DELETE /api/users/current', function () {
    beforeEach(async () => {
        await createTestUser();
    })

    afterEach(async () => { 
        await removeTestUser();
    })

    it('should can delete current user', async() => {
        const result = await supertest(web)
        .delete('/api/users/logout')
        .set('Authorization', 'test')

        expect(result.status).toBe(200)

        const user = await getTestUser()
        expect(user.token).toBeNull()
    })
    
})