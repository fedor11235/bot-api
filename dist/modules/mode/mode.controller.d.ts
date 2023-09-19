import { ModeService } from './mode.service';
export declare class ModeController {
    private modeService;
    constructor(modeService: ModeService);
    getMode(res: any, idUser: any): Promise<any>;
    setMode(res: any, idUser: any, mode: any): Promise<any>;
}
