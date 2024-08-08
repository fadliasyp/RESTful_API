import { prismaClient } from "../application/database.js";
import contactService from "../service/contact-service.js"


const create = async (req, res, next) => {
 try {
    // Ambil data pengguna dari permintaan
    const user = req.user
    // Ambil data permintaan dari permintaan
    const request = req.body
    const result = await contactService.create(user, request);
    res.status(200).json({
        data: result
    })
 } catch (error) {
    next(error)
 }   
}

const get = async (req, res, next) => {
    try {
        const user = req.user
        const contactId = req.params.contactId
        const result = await contactService.get(user, contactId)
        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const user = req.user
        const contactId = req.params.contactId
        const request = req.body
        request.id = contactId

        const result = await contactService.update(user, request)
        res.status(200).json({
            data: result
        })

    } catch (error) {
        next(error)
    }
}

const remove = async (req, res, next) => {
    try {
        const user = req.user
        const contactId = req.params.contactId

        await contactService.remove(user, contactId)
        res.status(200).json({
            data: "OK"
        })
    } catch (error) {
        next(error)
    }
}

const search = async(req, res, next) => {
    try {
        const user = req.user
        const request = {
            page: req.query.page,
            size: req.query.size,
            name: req.query.name,
            email: req.query.email,
            phone: req.query.phone
        };
        const result = await contactService.search(user, request)
        res.status(200).json({
            data: result.data,
            paging: result.paging
        })
    } catch (error) {
        next(error)
    }
}

export default {
    create,
    get, 
    update,
    remove,
    search
}