import type { User } from 'generated/prisma';
export declare class UserModel implements User {
    id: string;
    email: string;
    password: string;
    username: string;
    displayName: string;
    avatar: string;
    bio: string;
    createdAt: Date;
    updatedAt: Date;
}
