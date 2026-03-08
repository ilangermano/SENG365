import * as users from '../models/user.server.models';
import Logger from '../../config/logger';
import {Request, Response} from 'express';

const list = async (req: Request, res: Response): Promise<void> => {
    Logger.http('GET all users');
    try {
        const result = await users.getAll();
        res.status(200).send(result);
    } catch (err) {
        res.status(500)
            .send(`Error getting users ${err}`);
    }
};

const create = async (req: Request, res: Response): Promise<void> => {
    return null;
}

const read = async (req: Request, res: Response): Promise<void> => {
    return null;
}

const update = async (req: Request, res: Response): Promise<void> => {
    return null;
}

const remove = async (req: Request, res: Response): Promise<void> => {
    return null;
}

export { list, create, read, update, remove }
