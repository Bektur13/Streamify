import { ConfigService } from "@nestjs/config";
import type { Request } from 'express';
import type { User } from "../../../generated/prisma";
export declare function saveSession(req: Request, user: User): Promise<unknown>;
export declare function destroySession(req: Request, ConfigService: ConfigService): Promise<unknown>;
