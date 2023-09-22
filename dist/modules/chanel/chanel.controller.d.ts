import { ChanelService } from './chanel.service';
export declare class ChanelController {
    private chanelService;
    constructor(chanelService: ChanelService);
    getChanels(res: any, username: any): Promise<any>;
    createChanelUser(res: any, idUser: any, idChanel: any): Promise<any>;
    getChanelsUser(res: any, idUser: any): Promise<any>;
    getChanelsCategories(res: any, idUser: any, category: any, filter: any): Promise<any>;
}
