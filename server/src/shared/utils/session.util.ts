import { InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { Request } from 'express-session'
import type { User } from "../../../generated/prisma";

export function saveSession(req: Request, user: User,
) {
    return new Promise((resolve, reject) => {
        
        req.session.userId = user.id
        req.session.createdAt = new Date()

        req.session.save(err => {
            if(err) {
                return reject(
                    new InternalServerErrorException(
                        'Не удалось сохранить сессию'
                    )
                )
            }

            resolve(user)
        })
    }) 
}


export function destroySession(req: Request, ConfigService: ConfigService) {
    return new Promise((resolve, reject) => {
        req.session.destroy(err => {
            if(err) {
                return reject(
                    new InternalServerErrorException('Не удалось завершить сессию')
                )
            }

            req.res?.clearCookie(
                ConfigService.getOrThrow<string>('SESSION_NAME')
            )

            resolve(true)
        })
    })
}