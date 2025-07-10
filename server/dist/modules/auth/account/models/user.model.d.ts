import type { User } from '../../../../../generated/prisma';
export declare class UserModel implements User {
    id: string;
    email: string;
    password: string;
    username: string;
    displayName: string;
    avatar: string | null;
    bio: string | null;
    createdAt: Date;
    updatedAt: Date;
}
