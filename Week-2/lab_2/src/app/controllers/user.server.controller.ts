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
            .send(`ERROR getting users ${err}`);
    }
};

const create = async (req: Request, res: Response): Promise<void> => {
    Logger.http(`POST create a user with username: ${req.body.username}`)
    if (! req.body.hasOwnProperty("username")){
        res.status(400).send('Please provide a username field');
        return;
    }
    const username = req.body.username;
    try {
        const insertId = await users.insert( username );
        res.status(201).send({"user_id": insertId});
    } catch (err) {
        res.status(500).send(`ERROR creating user ${username}: ${err}`);
    }
};

const read = async (req: Request, res: Response): Promise<void> => {
    Logger.http(`GET single user id: ${req.params.id}`)
    const id = typeof req.params.id === 'string' ? req.params.id : req.params.id[0];
    try {
        const result = await users.getOne(parseInt(id, 10));
        if ( result.length === 0 ) {
            res.status(404 ).send('User not found.');
        } else {
            res.status(200).send(result[0]);
        }
    } catch (err) {
        res.status(500).send(`ERROR getting user ${id}: ${err}`);
    }
};

const update = async (req: Request, res: Response): Promise<void> => {
    return null;
}

const remove = async (req: Request, res: Response): Promise<void> => {
    return null;
}

export { list, create, read, update, remove }
