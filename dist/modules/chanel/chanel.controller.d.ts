import { ChanelService } from './chanel.service';
export declare class ChanelController {
    private chanelService;
    constructor(chanelService: ChanelService);
    getChanels(res: any, username: any): Promise<any>;
    createChanelUser(res: any, idUser: any, idChanel: any, title: any, username: any): Promise<any>;
    getChanelsUser(res: any, idUser: any): Promise<any>;
    getChanelsCategories(res: any, idUser: any, category: any, filter: any): Promise<any>;
    setCategoryChanel(res: any, idUser: any, category: any): Promise<any>;
    addChannelInCatalog(res: any, data: any): Promise<any>;
}
