import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getPromocode(res: any, idUser: any): Promise<any>;
    getProfile(res: any, idUser: any): Promise<any>;
    setProfile(res: any, idUser: any, tariffPlan: any, time: any): Promise<any>;
    setTariffTemp(res: any, idUser: any, tariffPlan: any): Promise<any>;
    uploadPromocode(res: any, idUser: any, promocode: any): Promise<any>;
    setAllDateProfile(res: any, idUser: any, body: any): Promise<any>;
    getCheckUser(res: any, idUser: any): Promise<any>;
    optProfile(res: any, idUser: any): Promise<any>;
    recommendationsProfile(res: any, idUser: any): Promise<any>;
    optUser(res: any, idUser: any): Promise<any>;
}
