import { prismaClient } from '../application/database.js';
import { createContactValidation } from '../validation/contact-validation.js'
import { validate } from '../validation/validation.js'

const create = async (user, request) => {
    
    const contact = validate(createContactValidation, request);
    contact.username = user.username;

    return prismaClient.contact.create({
        data: contact,
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true
        }
    })
}

export default {
    create
}