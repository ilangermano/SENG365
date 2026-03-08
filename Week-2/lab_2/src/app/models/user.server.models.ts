import { getPool } from '../../config/db';
import Logger from '../../config/logger';
import {ResultSetHeader, RowDataPacket} from 'mysql2'

const getAll = async (): Promise<User[]> => {
    Logger.info(`Getting all users from the database`);
    const conn = await getPool().getConnection();
    const query = 'select * from lab2_users';
    const [ rows ] = await conn.query<RowDataPacket[]>( query );
    return rows.map(row => ({
        user_id: row.user_id,
        username: row.username,
        email: row.email,
    }));
};

const getOne = async (): Promise<any> => {
    return null;
}

const insert = async (): Promise<any> => {
    return null;
}

const alter = async (): Promise<any> => {
    return null;
}

const remove = async (): Promise<any> => {
    return null;
}

export { getAll, getOne, insert, alter, remove }