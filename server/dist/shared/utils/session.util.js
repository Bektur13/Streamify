"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveSession = saveSession;
exports.destroySession = destroySession;
const common_1 = require("@nestjs/common");
function saveSession(req, user) {
    return new Promise((resolve, reject) => {
        req.session.userId = user.id.toString();
        req.session.createdAt = new Date();
        console.log('Session before save: ', req.session);
        req.session.save(err => {
            if (err) {
                return reject(new common_1.InternalServerErrorException('Не удалось сохранить сессию'));
            }
            resolve(user);
        });
    });
}
function destroySession(req, ConfigService) {
    return new Promise((resolve, reject) => {
        req.session.destroy(err => {
            if (err) {
                return reject(new common_1.InternalServerErrorException('Не удалось завершить сессию'));
            }
            req.res?.clearCookie(ConfigService.getOrThrow('SESSION_NAME'));
            resolve(true);
        });
    });
}
//# sourceMappingURL=session.util.js.map