import { Sweet, CreateSweetRequest, UpdateSweetRequest, SearchQuery } from '../types';
export declare class SweetService {
    create(data: CreateSweetRequest): Promise<Sweet>;
    findAll(): Promise<Sweet[]>;
    findById(id: number): Promise<Sweet | null>;
    search(query: SearchQuery): Promise<Sweet[]>;
    update(id: number, data: UpdateSweetRequest): Promise<Sweet | null>;
    delete(id: number): Promise<boolean>;
    purchase(id: number, quantity: number): Promise<Sweet | null>;
    restock(id: number, quantity: number): Promise<Sweet | null>;
}
//# sourceMappingURL=sweet.service.d.ts.map