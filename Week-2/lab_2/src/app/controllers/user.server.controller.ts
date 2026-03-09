import * as users from '../models/user.server.models';
import Logger from '../../config/logger';
import {Request, Response} from 'express';
import * as schemas from "../resources/schemas.json";
import { validate } from "../middleware/validator";

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
    const validation = await validate(
        schemas.user_register,
        req.body);
    if (validation !== true) {
        res.statusMessage = `Bad Request: ${validation.toString()}`;
        res.status(400).send();
        return;
    }

    const username = req.body.username;
    try {
        const insertId = await users.insert(username);
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
    const id = typeof req.params.id === 'string' ? req.params.id : req.params.id[0];
    const username = req.body.username;

    Logger.http(`PUT update user ${id} with username ${username}`);

    try {
        const result = await users.alter(parseInt(id, 10), username);
        if (result === 0) {
            res.status(404).send('User not found.');
        } else {
            res.status(200).send();
        }
    } catch (err) {
        res.status(500).send(`ERROR updating user ${id}: ${err}`);
    }
}

const remove = async (req: Request, res: Response): Promise<void> => {
    const id = typeof req.params.id === 'string' ? req.params.id : req.params.id[0];

    Logger.http(`DELETE user id: ${id}`);

    try {
        const result = await users.remove(parseInt(id, 10));
        if (result === 0) {
            res.status(404).send('User not found.');
        } else {
            res.status(200).send();
        }
    } catch (err) {
        res.status(500).send(`ERROR removing user ${id}: ${err}`);
    }

}

export { list, create, read, update, remove }
