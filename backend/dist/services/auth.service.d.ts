import { User, RegisterRequest, LoginRequest } from '../types';
export declare class AuthService {
    register(data: RegisterRequest): Promise<{
        user: Omit<User, 'password_hash'>;
        token: string;
    }>;
    login(data: LoginRequest): Promise<{
        user: Omit<User, 'password_hash'>;
        token: string;
    }>;
}
//# sourceMappingURL=auth.service.d.ts.map