import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getPromocode(res: any, idUser: any): Promise<any>;
    getProfile(res: any, idUser: any): Promise<any>;
    getCheckUser(res: any, idUser: any): Promise<any>;
}
