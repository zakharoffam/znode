/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/server/src/app.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const config_1 = __webpack_require__("@nestjs/config");
const serve_static_1 = __webpack_require__("@nestjs/serve-static");
const path_1 = __webpack_require__("path");
const storage_1 = __webpack_require__("./libs/storage/src/index.ts");
const auth_server_module_1 = __webpack_require__("./libs/auth/server-module/src/index.ts");
const server_module_1 = __webpack_require__("./libs/users/server-module/src/index.ts");
const event_logger_1 = __webpack_require__("./libs/event-logger/src/index.ts");
const helper_bot_1 = __webpack_require__("./libs/telegram/helper-bot/src/index.ts");
const schedule_1 = __webpack_require__("@nestjs/schedule");
let AppModule = class AppModule {
};
AppModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'client'),
            }),
            schedule_1.ScheduleModule.forRoot(),
            storage_1.StorageModule,
            event_logger_1.EventLoggerModule,
            auth_server_module_1.AuthModule,
            server_module_1.UsersModule,
            helper_bot_1.TelegramHelperBotModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),

/***/ "./libs/auth/server-module/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
(0, tslib_1.__exportStar)(__webpack_require__("./libs/auth/server-module/src/lib/auth.module.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/auth/server-module/src/lib/current-user.decarator.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/auth/server-module/src/lib/sign-in.dto.ts"), exports);


/***/ }),

/***/ "./libs/auth/server-module/src/lib/auth.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const express_1 = __webpack_require__("express");
const sign_in_dto_1 = __webpack_require__("./libs/auth/server-module/src/lib/sign-in.dto.ts");
const current_user_decarator_1 = __webpack_require__("./libs/auth/server-module/src/lib/current-user.decarator.ts");
const auth_service_1 = __webpack_require__("./libs/auth/server-module/src/lib/auth.service.ts");
const storage_1 = __webpack_require__("./libs/storage/src/index.ts");
const sign_up_dto_1 = __webpack_require__("./libs/auth/server-module/src/lib/sign-up.dto.ts");
const interfaces_1 = __webpack_require__("./libs/common/interfaces/src/index.ts");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    /**
     * Войти
     * @url /api/auth/sign-in
     * @param response
     * @param data
     */
    signIn(data, response) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const user = yield this.authService.checkEmailAndPassword(data.email, data.password);
            const token = this.authService.encryptJwt(user);
            response.setHeader('Authorization', `Bearer ${token}`);
            response.send({
                token: token,
                user: user,
            });
            response.end();
        });
    }
    /**
     * Регистрация нового пользователя
     * @param data
     */
    signUp(data) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return yield storage_1.UserEntity.createUser(data.email, data.name, data.password);
        });
    }
    /**
     * Метод возвращает данные текущего пользователя пользователя
     * @url /api/auth/current-user
     * @param user
     * @private
     */
    getUser(user) {
        return user;
    }
};
(0, tslib_1.__decorate)([
    (0, common_1.Post)('sign-in'),
    (0, tslib_1.__param)(0, (0, common_1.Body)()),
    (0, tslib_1.__param)(1, (0, common_1.Res)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof sign_in_dto_1.SignInDto !== "undefined" && sign_in_dto_1.SignInDto) === "function" ? _a : Object, typeof (_b = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _b : Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
(0, tslib_1.__decorate)([
    (0, common_1.Post)('sign-up'),
    (0, tslib_1.__param)(0, (0, common_1.Body)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_c = typeof sign_up_dto_1.SignUpDto !== "undefined" && sign_up_dto_1.SignUpDto) === "function" ? _c : Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
(0, tslib_1.__decorate)([
    (0, common_1.Get)('current-user'),
    (0, tslib_1.__param)(0, (0, current_user_decarator_1.CurrentUser)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_d = typeof interfaces_1.UserInterface !== "undefined" && interfaces_1.UserInterface) === "function" ? _d : Object]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_e = typeof interfaces_1.UserInterface !== "undefined" && interfaces_1.UserInterface) === "function" ? _e : Object)
], AuthController.prototype, "getUser", null);
AuthController = (0, tslib_1.__decorate)([
    (0, common_1.Controller)('auth'),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_f = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _f : Object])
], AuthController);
exports.AuthController = AuthController;


/***/ }),

/***/ "./libs/auth/server-module/src/lib/auth.middleware.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthMiddleware = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const auth_service_1 = __webpack_require__("./libs/auth/server-module/src/lib/auth.service.ts");
const storage_1 = __webpack_require__("./libs/storage/src/index.ts");
let AuthMiddleware = class AuthMiddleware {
    constructor(authService) {
        this.authService = authService;
    }
    /**
     * Промежуточный обработчик аутентификации пользователя
     * @param req
     * @param res
     * @param next
     */
    use(req, res, next) {
        var _a;
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const auth = req.headers['Authorization'];
            common_1.Logger.log(auth);
            if (!auth) {
                // Если в запросе нет токена авторизации отправим клиента на страницу авторизации
                throw new common_1.UnauthorizedException();
            }
            // Извлечем токен из заголовка авторизации
            const inputToken = String(auth).replace('Bearer ', '');
            // Расшифруем полученный токен
            const decodeToken = this.authService.decryptJwt(inputToken);
            if (!((_a = decodeToken === null || decodeToken === void 0 ? void 0 : decodeToken.user) === null || _a === void 0 ? void 0 : _a.email)) {
                // Если в расшифрованном токене отсутствуют пользовательские данные токен явно поддельный
                throw new common_1.UnauthorizedException();
            }
            let user = decodeToken.user;
            if (Date.now() > Number(String(decodeToken.exp) + '000')) {
                // Если срок действия токена просрочен, запросим новый токен и пользовательские данные
                user = yield storage_1.UserEntity.getUserByEmail(decodeToken.user.email);
                const newToken = this.authService.encryptJwt(user);
                // Обновим токен клиенту
                res.setHeader('Authorization', `Bearer ${newToken}`);
            }
            req.user = user;
            next();
        });
    }
};
AuthMiddleware = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], AuthMiddleware);
exports.AuthMiddleware = AuthMiddleware;


/***/ }),

/***/ "./libs/auth/server-module/src/lib/auth.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const auth_controller_1 = __webpack_require__("./libs/auth/server-module/src/lib/auth.controller.ts");
const auth_middleware_1 = __webpack_require__("./libs/auth/server-module/src/lib/auth.middleware.ts");
const storage_1 = __webpack_require__("./libs/storage/src/index.ts");
const auth_service_1 = __webpack_require__("./libs/auth/server-module/src/lib/auth.service.ts");
const jwt_1 = __webpack_require__("@nestjs/jwt");
let AuthModule = class AuthModule {
    configure(consumer) {
        consumer
            .apply(auth_middleware_1.AuthMiddleware)
            .exclude({ path: 'api/auth/sign-in', method: common_1.RequestMethod.POST }, { path: 'api/users', method: common_1.RequestMethod.POST })
            .forRoutes({ path: '*', method: common_1.RequestMethod.ALL });
    }
};
AuthModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([storage_1.UserEntity, storage_1.UserPasswordEntity]),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: '180s' },
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService],
    })
], AuthModule);
exports.AuthModule = AuthModule;


/***/ }),

/***/ "./libs/auth/server-module/src/lib/auth.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const storage_1 = __webpack_require__("./libs/storage/src/index.ts");
const jwt_1 = __webpack_require__("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    /**
     * Проверка адреса электропочты и пароля
     * @param email
     * @param password
     */
    checkEmailAndPassword(email, password) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const user = yield storage_1.UserEntity.findOne({ where: { email: email } });
            if (!user) {
                throw new common_1.UnauthorizedException(`${email} не зарегистрирован!`, `AuthLocalStrategy.validate()`);
            }
            const checkPassword = yield storage_1.UserPasswordEntity.isPasswordOfUser(user, password);
            if (!checkPassword) {
                throw new common_1.UnauthorizedException(`Неверный пароль!`, `AuthLocalStrategy.validate()`);
            }
            if (!user.isActive) {
                throw new common_1.ForbiddenException(`Доступ запрещен!`, `AuthLocalStrategy.validate()`);
            }
            return user;
        });
    }
    /**
     * Зашифровать токен JWT
     * @param user
     */
    encryptJwt(user) {
        const payload = { user };
        return this.jwtService.sign(payload);
    }
    /**
     * Расшифровать токен JWT
     * @param token
     */
    decryptJwt(token) {
        return this.jwtService.verify(token);
    }
};
AuthService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object])
], AuthService);
exports.AuthService = AuthService;


/***/ }),

/***/ "./libs/auth/server-module/src/lib/current-user.decarator.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CurrentUser = void 0;
const common_1 = __webpack_require__("@nestjs/common");
/**
 * Декоратор возвращающий данные текущего пользователя
 */
exports.CurrentUser = (0, common_1.createParamDecorator)((ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
});


/***/ }),

/***/ "./libs/auth/server-module/src/lib/sign-in.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SignInDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const class_validator_1 = __webpack_require__("class-validator");
class SignInDto {
}
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsEmail)(),
    (0, tslib_1.__metadata)("design:type", String)
], SignInDto.prototype, "email", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 64),
    (0, tslib_1.__metadata)("design:type", String)
], SignInDto.prototype, "password", void 0);
exports.SignInDto = SignInDto;


/***/ }),

/***/ "./libs/auth/server-module/src/lib/sign-up.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SignUpDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const class_validator_1 = __webpack_require__("class-validator");
class SignUpDto {
}
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsEmail)(),
    (0, tslib_1.__metadata)("design:type", String)
], SignUpDto.prototype, "email", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 255),
    (0, tslib_1.__metadata)("design:type", String)
], SignUpDto.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 64),
    (0, tslib_1.__metadata)("design:type", String)
], SignUpDto.prototype, "password", void 0);
exports.SignUpDto = SignUpDto;


/***/ }),

/***/ "./libs/common/interfaces/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
(0, tslib_1.__exportStar)(__webpack_require__("./libs/common/interfaces/src/lib/user.interface.ts"), exports);


/***/ }),

/***/ "./libs/common/interfaces/src/lib/user.interface.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/event-logger/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
(0, tslib_1.__exportStar)(__webpack_require__("./libs/event-logger/src/lib/event-logger.module.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/event-logger/src/lib/event-logger.service.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/event-logger/src/lib/dto/event-logger-record.dto.ts"), exports);


/***/ }),

/***/ "./libs/event-logger/src/lib/dto/event-logger-record.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventLoggerRecordDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const storage_1 = __webpack_require__("./libs/storage/src/index.ts");
const class_validator_1 = __webpack_require__("class-validator");
class EventLoggerRecordDto {
}
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsEnum)(storage_1.RecordTypes),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof storage_1.RecordTypes !== "undefined" && storage_1.RecordTypes) === "function" ? _a : Object)
], EventLoggerRecordDto.prototype, "type", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, tslib_1.__metadata)("design:type", String)
], EventLoggerRecordDto.prototype, "message", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, tslib_1.__metadata)("design:type", String)
], EventLoggerRecordDto.prototype, "context", void 0);
exports.EventLoggerRecordDto = EventLoggerRecordDto;


/***/ }),

/***/ "./libs/event-logger/src/lib/event-logger.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventLoggerController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const storage_1 = __webpack_require__("./libs/storage/src/index.ts");
const event_logger_record_dto_1 = __webpack_require__("./libs/event-logger/src/lib/dto/event-logger-record.dto.ts");
let EventLoggerController = class EventLoggerController {
    /**
     * Добавить запись в журнал событий
     * @url /api/event-logger/record
     * @param body EventLoggerRecordDto
     * @returns EventLoggerRecordEntity
     */
    postRecord(body) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return yield storage_1.EventLoggerRecordEntity.addRecord(body.type, body.message, body.context);
        });
    }
    /**
     * Получить все записи журнала событий
     * @returns EventLoggerRecordEntity[]
     */
    getRecords() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return yield storage_1.EventLoggerRecordEntity.find();
        });
    }
};
(0, tslib_1.__decorate)([
    (0, common_1.Post)('records'),
    (0, tslib_1.__param)(0, (0, common_1.Body)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof event_logger_record_dto_1.EventLoggerRecordDto !== "undefined" && event_logger_record_dto_1.EventLoggerRecordDto) === "function" ? _a : Object]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], EventLoggerController.prototype, "postRecord", null);
(0, tslib_1.__decorate)([
    (0, common_1.Get)('records'),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", []),
    (0, tslib_1.__metadata)("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], EventLoggerController.prototype, "getRecords", null);
EventLoggerController = (0, tslib_1.__decorate)([
    (0, common_1.Controller)('event-logger')
], EventLoggerController);
exports.EventLoggerController = EventLoggerController;


/***/ }),

/***/ "./libs/event-logger/src/lib/event-logger.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventLoggerModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const storage_1 = __webpack_require__("./libs/storage/src/index.ts");
const event_logger_controller_1 = __webpack_require__("./libs/event-logger/src/lib/event-logger.controller.ts");
const event_logger_service_1 = __webpack_require__("./libs/event-logger/src/lib/event-logger.service.ts");
let EventLoggerModule = class EventLoggerModule {
};
EventLoggerModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([storage_1.EventLoggerRecordEntity])],
        controllers: [event_logger_controller_1.EventLoggerController],
        providers: [event_logger_service_1.EventLoggerService],
        exports: [event_logger_service_1.EventLoggerService],
    })
], EventLoggerModule);
exports.EventLoggerModule = EventLoggerModule;


/***/ }),

/***/ "./libs/event-logger/src/lib/event-logger.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventLoggerService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const storage_1 = __webpack_require__("./libs/storage/src/index.ts");
let EventLoggerService = class EventLoggerService extends common_1.ConsoleLogger {
    stdout(message, context) {
        console.log('EVENT LOGGER');
        console.log('timestamp: ' + new Date().toISOString());
        console.log('context: ' + context);
        console.log('message: ' + message);
        console.log();
    }
    log(message, context) {
        this.stdout(message, context);
        storage_1.EventLoggerRecordEntity.addRecord(storage_1.RecordTypes.log, message, context);
    }
    warn(message, context) {
        this.stdout(message, context);
        storage_1.EventLoggerRecordEntity.addRecord(storage_1.RecordTypes.warn, message, context);
    }
    erroe(message, context) {
        this.stdout(message, context);
        storage_1.EventLoggerRecordEntity.addRecord(storage_1.RecordTypes.error, message, context);
    }
    verbose(message, context) {
        this.stdout(message, context);
        storage_1.EventLoggerRecordEntity.addRecord(storage_1.RecordTypes.verbose, message, context);
    }
    debug(message, context) {
        this.stdout(message, context);
        storage_1.EventLoggerRecordEntity.addRecord(storage_1.RecordTypes.debug, message, context);
    }
};
EventLoggerService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)()
], EventLoggerService);
exports.EventLoggerService = EventLoggerService;


/***/ }),

/***/ "./libs/storage/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
(0, tslib_1.__exportStar)(__webpack_require__("./libs/storage/src/lib/storage.module.ts"), exports);
// Сущности
(0, tslib_1.__exportStar)(__webpack_require__("./libs/storage/src/lib/entities/user.entity.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/storage/src/lib/entities/user-password.entity.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/storage/src/lib/entities/role.entity.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/storage/src/lib/entities/event-logger-record.entity.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/storage/src/lib/entities/teleram-update.entity.ts"), exports);


/***/ }),

/***/ "./libs/storage/src/lib/entities/event-logger-record.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var EventLoggerRecordEntity_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventLoggerRecordEntity = exports.RecordTypes = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
var RecordTypes;
(function (RecordTypes) {
    RecordTypes["log"] = "log";
    RecordTypes["warn"] = "warn";
    RecordTypes["error"] = "error";
    RecordTypes["verbose"] = "verbose";
    RecordTypes["debug"] = "debug";
})(RecordTypes = exports.RecordTypes || (exports.RecordTypes = {}));
/**
 * Запись журнала событий
 */
let EventLoggerRecordEntity = EventLoggerRecordEntity_1 = class EventLoggerRecordEntity extends typeorm_1.BaseEntity {
    /**
     * Добавить запись в журнал событий
     * @param type Тип записи
     * @param message Сообщение
     * @param context Контекст в котором вызывается метод
     * @returns
     */
    static addRecord(type, message, context) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            let record = new EventLoggerRecordEntity_1();
            record.type = type;
            record.message = message;
            record.context = context !== null && context !== void 0 ? context : null;
            record = yield this.save(record);
            return record;
        });
    }
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, tslib_1.__metadata)("design:type", Number)
], EventLoggerRecordEntity.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.CreateDateColumn)(),
    (0, tslib_1.__metadata)("design:type", String)
], EventLoggerRecordEntity.prototype, "timestamp", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false, enum: RecordTypes }),
    (0, tslib_1.__metadata)("design:type", String)
], EventLoggerRecordEntity.prototype, "type", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    (0, tslib_1.__metadata)("design:type", String)
], EventLoggerRecordEntity.prototype, "message", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], EventLoggerRecordEntity.prototype, "context", void 0);
EventLoggerRecordEntity = EventLoggerRecordEntity_1 = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)()
], EventLoggerRecordEntity);
exports.EventLoggerRecordEntity = EventLoggerRecordEntity;


/***/ }),

/***/ "./libs/storage/src/lib/entities/role.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoleEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const class_validator_1 = __webpack_require__("class-validator");
const user_entity_1 = __webpack_require__("./libs/storage/src/lib/entities/user.entity.ts");
let RoleEntity = class RoleEntity extends typeorm_1.BaseEntity {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, tslib_1.__metadata)("design:type", Number)
], RoleEntity.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 50),
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, unique: true, nullable: false }),
    (0, tslib_1.__metadata)("design:type", String)
], RoleEntity.prototype, "title", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToMany)(() => user_entity_1.UserEntity, user => user.roles),
    (0, tslib_1.__metadata)("design:type", Array)
], RoleEntity.prototype, "users", void 0);
RoleEntity = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)('Roles')
], RoleEntity);
exports.RoleEntity = RoleEntity;


/***/ }),

/***/ "./libs/storage/src/lib/entities/teleram-update.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var TeleramUpdateEntity_1, _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TeleramUpdateEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
let TeleramUpdateEntity = TeleramUpdateEntity_1 = class TeleramUpdateEntity extends typeorm_1.BaseEntity {
    /**
     * Добавить запись
     * @param message
     */
    static addRecord(message) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            let record = new TeleramUpdateEntity_1();
            record.message = message;
            record = yield this.save(record);
            return record;
        });
    }
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, tslib_1.__metadata)("design:type", String)
], TeleramUpdateEntity.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.CreateDateColumn)(),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], TeleramUpdateEntity.prototype, "timestamp", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    (0, tslib_1.__metadata)("design:type", String)
], TeleramUpdateEntity.prototype, "message", void 0);
TeleramUpdateEntity = TeleramUpdateEntity_1 = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)('Telegram_update')
], TeleramUpdateEntity);
exports.TeleramUpdateEntity = TeleramUpdateEntity;


/***/ }),

/***/ "./libs/storage/src/lib/entities/user-password.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var UserPasswordEntity_1, _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserPasswordEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const argon2 = __webpack_require__("argon2");
const user_entity_1 = __webpack_require__("./libs/storage/src/lib/entities/user.entity.ts");
const common_1 = __webpack_require__("@nestjs/common");
let UserPasswordEntity = UserPasswordEntity_1 = class UserPasswordEntity extends typeorm_1.BaseEntity {
    /**
     * Установить пароля пользователя
     * @param user
     * @param password
     */
    static setPassword(user, password) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            if (password.length < 8 || password.length > 64) {
                throw new common_1.BadRequestException(`Длина пароля должна быть от 8 до 64 символов!`, `UserPasswordEntity.setPassword()`);
            }
            let userPassword = yield this.findOne({ where: { user: user } });
            if (userPassword) {
                userPassword.passwordHashed = yield argon2.hash(password);
                yield this.save(userPassword);
                return;
            }
            userPassword = new UserPasswordEntity_1();
            userPassword.user = user;
            userPassword.passwordHashed = yield argon2.hash(password);
            return;
        });
    }
    /**
     * Это пароль пользователя?
     * @param user
     * @param password
     */
    static isPasswordOfUser(user, password) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const entity = yield this.findOne({ where: { user: user } });
            if (!entity)
                return false;
            return yield argon2.verify(entity.passwordHashed, password);
        });
    }
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, tslib_1.__metadata)("design:type", Number)
], UserPasswordEntity.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToOne)(() => user_entity_1.UserEntity, user => user.password),
    (0, typeorm_1.JoinColumn)(),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof user_entity_1.UserEntity !== "undefined" && user_entity_1.UserEntity) === "function" ? _a : Object)
], UserPasswordEntity.prototype, "user", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ type: 'varchar', length: 512, nullable: false }),
    (0, tslib_1.__metadata)("design:type", String)
], UserPasswordEntity.prototype, "passwordHashed", void 0);
UserPasswordEntity = UserPasswordEntity_1 = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)('User_password')
], UserPasswordEntity);
exports.UserPasswordEntity = UserPasswordEntity;


/***/ }),

/***/ "./libs/storage/src/lib/entities/user.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var UserEntity_1, _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const class_validator_1 = __webpack_require__("class-validator");
const common_1 = __webpack_require__("@nestjs/common");
const user_password_entity_1 = __webpack_require__("./libs/storage/src/lib/entities/user-password.entity.ts");
const role_entity_1 = __webpack_require__("./libs/storage/src/lib/entities/role.entity.ts");
let UserEntity = UserEntity_1 = class UserEntity extends typeorm_1.BaseEntity {
    /**
     * Создание нового пользователя
     * @param email
     * @param name
     * @param password
     */
    static createUser(email, name, password) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            common_1.Logger.log(`Создание нового пользователя.`, `UserEntity.createUser(${email}, ${name})`);
            const checkEmail = yield this.findOne({ where: { email: email } });
            if (checkEmail) {
                common_1.Logger.warn(`${email} занят!`, `UserEntity.createUser(${email}, ${name})`);
                throw new common_1.BadRequestException(`${email} занят!`);
            }
            const countUsersWithSameName = yield this.count({ where: { name: name } });
            let user = new UserEntity_1();
            user.email = email;
            user.name = !countUsersWithSameName ? name : `${name} - ${countUsersWithSameName + 1}`;
            const validateUserDataErrors = yield (0, class_validator_1.validate)(user);
            if (validateUserDataErrors.length) {
                common_1.Logger.warn(`${validateUserDataErrors}`, `UserEntity.createUser(${email}, ${name})`);
                throw new common_1.BadRequestException(validateUserDataErrors);
            }
            user = yield this.save(user);
            try {
                yield user_password_entity_1.UserPasswordEntity.setPassword(user, password);
            }
            catch (err) {
                common_1.Logger.warn(`Пароль не прошел валидацию! Создание пользователя прервано!`, `UserEntity.createUser(${email}, ${name})`);
                yield this.delete(user);
                throw new common_1.BadRequestException(err);
            }
            // Если это первый пользователь приложения - инициализируем новые роли и пользователя-админа
            const currentUsersCount = yield this.count();
            if (currentUsersCount === 1) {
                common_1.Logger.log(`Создан первый пользователь приложения.`, `UserEntity.createUser(${email}, ${name})`);
                common_1.Logger.log(`Инициализируем ролевую модель и назначаем администратора!`, `UserEntity.createUser(${email}, ${name})`);
                let roleAdmin = new role_entity_1.RoleEntity();
                roleAdmin.title = 'admin';
                roleAdmin = yield role_entity_1.RoleEntity.save(roleAdmin);
                common_1.Logger.log(`Создана роль "Администратор".`, `UserEntity.createUser(${email}, ${name})`);
                const roleUser = new role_entity_1.RoleEntity();
                roleUser.title = 'user';
                yield role_entity_1.RoleEntity.save(roleUser);
                common_1.Logger.log(`Создана роль "Пользователь".`, `UserEntity.createUser(${email}, ${name})`);
                user.roles = [roleAdmin];
                yield this.save(user);
                common_1.Logger.log(`Пользователю ${name} присвоена роль "Администратор".`, `UserEntity.createUser(${email}, ${name})`);
            }
            const roleUser = yield role_entity_1.RoleEntity.findOne({ where: { title: 'user' } });
            user.roles = [...user.roles, roleUser];
            yield this.save(user);
            common_1.Logger.log(`Пользователю ${name} присвоена роль "Пользователь".`, `UserEntity.createUser(${email}, ${name})`);
            common_1.Logger.log(`Пользователь ${name} успешно зарегистрирован.`, `UserEntity.createUser(${email}, ${name})`);
            return user;
        });
    }
    /**
     * Получить пользователя по email
     * @param email
     */
    static getUserByEmail(email) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const entity = yield this.findOne({ where: { email: email } });
            if (!entity) {
                throw new common_1.UnauthorizedException();
            }
            if (!(entity === null || entity === void 0 ? void 0 : entity.isActive)) {
                throw new common_1.ForbiddenException();
            }
            return {
                email: entity.email,
                name: entity.name,
            };
        });
    }
};
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.Length)(1, 255),
    (0, typeorm_1.PrimaryColumn)({ type: 'varchar', length: 255, unique: true }),
    (0, tslib_1.__metadata)("design:type", String)
], UserEntity.prototype, "email", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 255),
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, unique: true, nullable: false }),
    (0, tslib_1.__metadata)("design:type", String)
], UserEntity.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, typeorm_1.Column)({ type: 'boolean', nullable: false, default: true }),
    (0, tslib_1.__metadata)("design:type", Boolean)
], UserEntity.prototype, "isActive", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.CreateDateColumn)(),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], UserEntity.prototype, "createTimestamp", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, tslib_1.__metadata)("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], UserEntity.prototype, "updateTimestamp", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToOne)(() => user_password_entity_1.UserPasswordEntity, password => password.user),
    (0, tslib_1.__metadata)("design:type", typeof (_c = typeof user_password_entity_1.UserPasswordEntity !== "undefined" && user_password_entity_1.UserPasswordEntity) === "function" ? _c : Object)
], UserEntity.prototype, "password", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToMany)(() => role_entity_1.RoleEntity, roles => roles.users),
    (0, typeorm_1.JoinTable)(),
    (0, tslib_1.__metadata)("design:type", Array)
], UserEntity.prototype, "roles", void 0);
UserEntity = UserEntity_1 = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)('Users')
], UserEntity);
exports.UserEntity = UserEntity;


/***/ }),

/***/ "./libs/storage/src/lib/storage.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StorageModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const ormconfig_1 = __webpack_require__("./ormconfig.ts");
let StorageModule = class StorageModule {
};
StorageModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({ imports: [typeorm_1.TypeOrmModule.forRoot(ormconfig_1.default)] })
], StorageModule);
exports.StorageModule = StorageModule;


/***/ }),

/***/ "./libs/telegram/helper-bot/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
(0, tslib_1.__exportStar)(__webpack_require__("./libs/telegram/helper-bot/src/lib/telegram-helper-bot.module.ts"), exports);


/***/ }),

/***/ "./libs/telegram/helper-bot/src/lib/telegram-helper-bot.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TelegramHelperBotModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const storage_1 = __webpack_require__("./libs/storage/src/index.ts");
const nestjs_telegraf_1 = __webpack_require__("nestjs-telegraf");
const telegram_helper_bot_service_1 = __webpack_require__("./libs/telegram/helper-bot/src/lib/telegram-helper-bot.service.ts");
let TelegramHelperBotModule = class TelegramHelperBotModule {
};
TelegramHelperBotModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                storage_1.EventLoggerRecordEntity,
                storage_1.TeleramUpdateEntity,
            ]),
            nestjs_telegraf_1.TelegrafModule.forRoot({
                token: String(process.env.HELPER_BOT_TOKEN),
            }),
        ],
        providers: [telegram_helper_bot_service_1.TelegramHelperBotService],
    })
], TelegramHelperBotModule);
exports.TelegramHelperBotModule = TelegramHelperBotModule;


/***/ }),

/***/ "./libs/telegram/helper-bot/src/lib/telegram-helper-bot.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TelegramHelperBotService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const nestjs_telegraf_1 = __webpack_require__("nestjs-telegraf");
const telegraf_1 = __webpack_require__("telegraf");
const storage_1 = __webpack_require__("./libs/storage/src/index.ts");
let TelegramHelperBotService = class TelegramHelperBotService {
    startCommand(ctx) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            yield storage_1.TeleramUpdateEntity.addRecord(JSON.stringify(ctx.update));
            yield ctx.reply('Привет!');
            yield ctx.reply('👋');
            common_1.Logger.log('Новый чат!', 'TelegramHelperBotService.startCommand()');
            yield ctx.tg.sendMessage(1040890736, 'К боту подключился новый пользователь!');
        });
    }
    // @On('message')
    // public async messageCommand(ctx: Context) {
    //   await TeleramUpdateEntity.addRecord(JSON.stringify(ctx.update));
    //   Logger.log('Новое сообщение!', 'TelegramHelperBotService.messageCommand()');
    //   await ctx.reply('Привет!');
    //   await ctx.reply('👋');
    //   setTimeout(async () => {
    //     await ctx.reply('Сколько будет 2 + 2?', {
    //       reply_markup: {
    //         inline_keyboard: [
    //           [{ text: '4', callback_data: '4'}],
    //           [{ text: '8', callback_data: '8'}]
    //         ]
    //       }
    //     })
    //   }, 1000);
    // }
    getMe(ctx) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            console.log(yield ctx.tg.getMe());
            yield ctx.reply('1');
        });
    }
    onAnswer(ctx) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            common_1.Logger.log('Новое действие!', 'TelegramHelperBotService.onAnswer()');
            if ("callback_query" in ctx.update) {
                const query = ctx.update.callback_query;
                const userAnswer = 'data' in query ? query.data : null;
                yield ctx.reply('Тут надо подумать...');
                yield ctx.reply('🤔');
                yield ctx.tg.sendChatAction(1040890736, 'typing');
                if (userAnswer === '4') {
                    setTimeout(() => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                        yield ctx.reply('Правильно!');
                        yield ctx.reply('🥳');
                    }), 2500);
                }
                else {
                    setTimeout(() => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                        yield ctx.reply('К сожалению это не верный ответ.');
                        yield ctx.reply('🤪');
                    }), 1000);
                }
            }
        });
    }
};
(0, tslib_1.__decorate)([
    (0, nestjs_telegraf_1.Start)(),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof telegraf_1.Context !== "undefined" && telegraf_1.Context) === "function" ? _a : Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], TelegramHelperBotService.prototype, "startCommand", null);
(0, tslib_1.__decorate)([
    (0, nestjs_telegraf_1.Hears)('1'),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_b = typeof telegraf_1.Context !== "undefined" && telegraf_1.Context) === "function" ? _b : Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], TelegramHelperBotService.prototype, "getMe", null);
(0, tslib_1.__decorate)([
    (0, nestjs_telegraf_1.Action)(['4', '8']),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_c = typeof telegraf_1.Context !== "undefined" && telegraf_1.Context) === "function" ? _c : Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], TelegramHelperBotService.prototype, "onAnswer", null);
TelegramHelperBotService = (0, tslib_1.__decorate)([
    (0, nestjs_telegraf_1.Update)(),
    (0, common_1.Injectable)()
], TelegramHelperBotService);
exports.TelegramHelperBotService = TelegramHelperBotService;


/***/ }),

/***/ "./libs/users/server-module/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
(0, tslib_1.__exportStar)(__webpack_require__("./libs/users/server-module/src/lib/users.module.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/users/server-module/src/lib/dto/create-user.dto.ts"), exports);


/***/ }),

/***/ "./libs/users/server-module/src/lib/dto/create-user.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateUserDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const class_validator_1 = __webpack_require__("class-validator");
class CreateUserDto {
}
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsEmail)(),
    (0, tslib_1.__metadata)("design:type", String)
], CreateUserDto.prototype, "email", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 255),
    (0, tslib_1.__metadata)("design:type", String)
], CreateUserDto.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(7, 64),
    (0, tslib_1.__metadata)("design:type", String)
], CreateUserDto.prototype, "password", void 0);
exports.CreateUserDto = CreateUserDto;


/***/ }),

/***/ "./libs/users/server-module/src/lib/users.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const users_service_1 = __webpack_require__("./libs/users/server-module/src/lib/users.service.ts");
const create_user_dto_1 = __webpack_require__("./libs/users/server-module/src/lib/dto/create-user.dto.ts");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    /**
     * Создание нового пользователя
     * @url /api/users
     * @param data
     * @private
     */
    createUser(data) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return yield this.usersService.createUser(data);
        });
    }
    /**
     * Получить список всех пользователей
     * @url /api/users
     * @private
     */
    getAllUsers() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return yield this.usersService.findAllUsers();
        });
    }
};
(0, tslib_1.__decorate)([
    (0, common_1.Post)(),
    (0, tslib_1.__param)(0, (0, common_1.Body)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof create_user_dto_1.CreateUserDto !== "undefined" && create_user_dto_1.CreateUserDto) === "function" ? _a : Object]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], UsersController.prototype, "createUser", null);
(0, tslib_1.__decorate)([
    (0, common_1.Get)(),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", []),
    (0, tslib_1.__metadata)("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], UsersController.prototype, "getAllUsers", null);
UsersController = (0, tslib_1.__decorate)([
    (0, common_1.Controller)('users'),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_d = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _d : Object])
], UsersController);
exports.UsersController = UsersController;


/***/ }),

/***/ "./libs/users/server-module/src/lib/users.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const storage_1 = __webpack_require__("./libs/storage/src/index.ts");
const storage_2 = __webpack_require__("./libs/storage/src/index.ts");
const users_controller_1 = __webpack_require__("./libs/users/server-module/src/lib/users.controller.ts");
const users_service_1 = __webpack_require__("./libs/users/server-module/src/lib/users.service.ts");
let UsersModule = class UsersModule {
};
UsersModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                storage_1.UserEntity, storage_1.UserPasswordEntity, storage_2.RoleEntity,
            ]),
        ],
        controllers: [users_controller_1.UsersController],
        providers: [users_service_1.UsersService],
    })
], UsersModule);
exports.UsersModule = UsersModule;


/***/ }),

/***/ "./libs/users/server-module/src/lib/users.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const storage_1 = __webpack_require__("./libs/storage/src/index.ts");
let UsersService = class UsersService {
    /**
     * Создание пользователя
     * @param data
     */
    createUser(data) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return yield storage_1.UserEntity.createUser(data.email, data.name, data.password);
        });
    }
    /**
     * Найти всех пользователей
     */
    findAllUsers() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return storage_1.UserEntity.find({ relations: ['roles'] });
        });
    }
};
UsersService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)()
], UsersService);
exports.UsersService = UsersService;


/***/ }),

/***/ "./ormconfig.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const path_1 = __webpack_require__("path");
/**
 * Конфигурация подключения к СУБД
 * Данная конфигурация используется как для работы в рантайме, так и для работы с TypeORM CLI
 */
exports["default"] = (() => {
    return {
        type: 'postgres',
        url: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false,
        },
        autoLoadEntities: true,
        synchronize: false,
        retryAttempts: 1,
        cli: {
            migrationsDir: (0, path_1.join)(__dirname, 'libs', 'storage', 'src', 'lib', 'migrations'),
        },
        entities: [
            (0, path_1.join)(__dirname, 'libs', 'storage', 'src', 'lib', 'entities', '*.entity.{ts,js}'),
            (0, path_1.join)(__dirname, 'libs', 'storage', 'src', 'lib', 'entities', '**', '*.entity.{ts,js}'),
        ],
        migrations: [
            (0, path_1.join)(__dirname, 'libs', 'storage', 'src', 'lib', 'migrations', '*.{ts,js}'),
            (0, path_1.join)(__dirname, 'libs', 'storage', 'src', 'lib', 'migrations', '**', '*.{ts,js}'),
        ],
        subscribers: [
            (0, path_1.join)(__dirname, 'libs', 'storage', 'src', 'lib', 'subscribers', '*.{ts,js}'),
            (0, path_1.join)(__dirname, 'libs', 'storage', 'src', 'lib', 'subscribers', '**', '*.{ts,js}'),
        ],
    };
})();


/***/ }),

/***/ "@nestjs/common":
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/config":
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/jwt":
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),

/***/ "@nestjs/schedule":
/***/ ((module) => {

module.exports = require("@nestjs/schedule");

/***/ }),

/***/ "@nestjs/serve-static":
/***/ ((module) => {

module.exports = require("@nestjs/serve-static");

/***/ }),

/***/ "@nestjs/typeorm":
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),

/***/ "argon2":
/***/ ((module) => {

module.exports = require("argon2");

/***/ }),

/***/ "class-validator":
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),

/***/ "express":
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "nestjs-telegraf":
/***/ ((module) => {

module.exports = require("nestjs-telegraf");

/***/ }),

/***/ "telegraf":
/***/ ((module) => {

module.exports = require("telegraf");

/***/ }),

/***/ "tslib":
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),

/***/ "typeorm":
/***/ ((module) => {

module.exports = require("typeorm");

/***/ }),

/***/ "path":
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const core_1 = __webpack_require__("@nestjs/core");
const app_module_1 = __webpack_require__("./apps/server/src/app.module.ts");
const config_1 = __webpack_require__("@nestjs/config");
function bootstrap() {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        // const app = await NestFactory.create(AppModule, {
        //   bufferLogs: true,
        //   logger: new EventLoggerService,
        // });
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        const configService = app.get(config_1.ConfigService);
        const port = configService.get('PORT');
        const globalPrefix = 'api';
        // Инициализируем глобальный префикс для всех REST'ов
        app.setGlobalPrefix(globalPrefix);
        // Инициализируем глобальную валидацию всех входящих данных через DTO
        app.useGlobalPipes(new common_1.ValidationPipe());
        // Стартуем сервер
        yield app.listen(port);
        common_1.Logger.log(`Сервер запущен в режиме "${"development"}" на: http://localhost:${port}/${globalPrefix}`);
    });
}
bootstrap().catch((err) => {
    common_1.Logger.error(`При запуске сервера возникла ошибка:`, `main.boostrap()`);
    console.error(err);
});

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map