import { Request, Response } from 'express';
export declare const createSweet: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getAllSweets: (req: Request, res: Response) => Promise<void>;
export declare const searchSweets: (req: Request, res: Response) => Promise<void>;
export declare const updateSweet: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteSweet: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const purchaseSweet: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const restockSweet: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=sweet.controller.d.ts.map