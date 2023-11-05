import { PrismaClient } from "@prisma/client";
import { Request, Response } from 'express';

// import from errors
import { NotFoundError } from "../errors/not-found-error";
import { NotAuthorizedError } from "../errors/not-authorized-error";

const prisma = new PrismaClient()

// get users form prisma
export const getUser = async (req: Request, res: Response) => {
    try {
        const response = await prisma.user.findMany();
        res.status(200).json(response)
    } catch {
        throw new NotFoundError;
    }
}

// create a new users
export const createUser = async (req: Request, res: Response) => {
    const { name, email } = req.body
    try {
        const user = await prisma.user.findUnique({
            where: { email: email }
        })

        if (user) return res.status(200).json({ 'pesan': 'email sudah terdaftar' })

        const response = await prisma.user.create({
            data: {
                name,
                email
            }
        })

        const data = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        return res.status(200).json(data)


    } catch (error) {
        throw new NotAuthorizedError;
    }
}

// get user by id
export const getUserById = async (req: Request, res: Response) => {   
    const { id } = req.params
    try {
        const response = await prisma.user.findUnique({
            where: { id: id}
        })
        res.status(200).json(response)
    } catch (error) {
        throw new NotFoundError;
    }
}