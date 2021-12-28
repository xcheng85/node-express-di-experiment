import {
    controller, httpGet, httpPost, httpPut, httpDelete, BaseHttpController
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import TYPES from '../constants/type';
import { Request, Response } from 'express';
import { Player, PlayerRequestModel } from '../models/player';
import { PlayerService } from '../services/player';
import { ValidateBody, ValidateQuery } from '../decorators/validate';
import HttpError from '../utils/error';
import supertest from 'supertest';

@controller("/player")
export class PlayerController extends BaseHttpController {
    constructor(@inject(TYPES.PlayerService) private playerService: PlayerService) {
        super();
    }

    @httpGet('/')
    public getPlayers(): Promise<Player[]> {
        return this.playerService.getPlayers();
    }

    @ValidateQuery(PlayerRequestModel)
    @httpGet('/:name')
    public async getPlayer(request: Request, response: Response) {
        const player = await this.playerService.getPlayer(request.params.name);
        if (player)
            return this.ok(player);
        else
            throw new HttpError('player is not found', StatusCodes.NOT_FOUND);
    }
}