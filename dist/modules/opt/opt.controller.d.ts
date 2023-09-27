import { OptService } from './opt.service';
export declare class OptController {
    private modeService;
    constructor(modeService: OptService);
    createOpt(res: any, idUser: any, chanel: any): Promise<any>;
    getOpt(res: any, idUser: any): Promise<any>;
    getStatOpt(res: any, chanel: any): Promise<any>;
    getOptCategories(res: any, idUser: any, category: any, filter: any): Promise<any>;
    setOpt(res: any, idUser: any, data: any): Promise<any>;
}
