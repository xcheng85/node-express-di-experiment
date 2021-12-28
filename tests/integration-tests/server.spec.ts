import 'jest';
import express from 'express';
import request from 'supertest';
import {
    StatusCodes,
} from 'http-status-codes';
import { Server } from '../../src/server';

describe('status integration tests', () => {
    let app: express.Application;

    beforeAll(async () => {
        app = new Server().instance;
    });

    it('can get server time', async () => {
        await request(app)
            .get('/player/Roger1')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect((res: request.Response) => {
                // eslint-disable-next-line no-console
                console.log(res.text);
            })
            .expect(StatusCodes.NOT_FOUND);
    });
});