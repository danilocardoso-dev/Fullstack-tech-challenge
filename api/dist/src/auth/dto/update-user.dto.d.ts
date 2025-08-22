import { RoleEnum } from '../enums/role.enum';
export declare class UpdateUserDto {
    name?: string;
    email?: string;
    password?: string;
    role?: RoleEnum;
    tenantId?: string;
}
