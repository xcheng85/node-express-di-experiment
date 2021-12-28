import { provide } from 'inversify-binding-decorators';
import TYPES from '../constants/type';
import { Player } from '../models/player';
import { inject } from 'inversify';

@provide(TYPES.PlayerService)
export class PlayerService {
    private players: Array<Player> = [
        { name: 'Roger', email: 'rf@atp.cpm' },
        { name: 'Rafael', email: 'rnadal@atp.com' },
    ];

    constructor() {

    }

    public getPlayers(): Promise<Player[]> {
        return new Promise<Player[]>((resolve, reject) => {
            resolve([]);
        });
    }

    public getPlayer(name: string): Promise<Player | undefined> {
        const foundPlayer = this.players.find((c) => c.name === name);
        return new Promise<Player | undefined>((resolve, reject) => {
            resolve(foundPlayer);
        });
    }
}