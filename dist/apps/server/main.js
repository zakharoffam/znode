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
const databases_1 = __webpack_require__("./libs/databases/src/index.ts");
const server_module_1 = __webpack_require__("./libs/auth/server-module/src/index.ts");
let AppModule = class AppModule {
};
AppModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'web-client'),
            }),
            databases_1.DatabasesModule,
            server_module_1.AuthModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),

/***/ "./libs/auth/common/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
(0, tslib_1.__exportStar)(__webpack_require__("./libs/auth/common/src/lib/user.interface.ts"), exports);


/***/ }),

/***/ "./libs/auth/common/src/lib/user.interface.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/auth/server-module/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
(0, tslib_1.__exportStar)(__webpack_require__("./libs/auth/server-module/src/lib/auth.module.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/auth/server-module/src/lib/user.decarator.ts"), exports);


/***/ }),

/***/ "./libs/auth/server-module/src/lib/auth-by-login.strategy.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthByLoginStrategy = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const databases_1 = __webpack_require__("./libs/databases/src/index.ts");
const typeorm_2 = __webpack_require__("typeorm");
let AuthByLoginStrategy = class AuthByLoginStrategy {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    /**
     * Стратегия авторизации пользователя по логину
     * @param login
     */
    strategy(login) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const user = yield this.usersRepository.findOne({ where: { login: login } });
            if (!user) {
                throw new common_1.UnauthorizedException('Unauthorized', `AuthStrategy.strategy(${login})`);
            }
            else if (!user.isActive) {
                throw new common_1.ForbiddenException('Доступ запрещен', `AuthStrategy.strategy(${login})`);
            }
            else {
                return user;
            }
        });
    }
};
AuthByLoginStrategy = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__param)(0, (0, typeorm_1.InjectRepository)(databases_1.UserEntity)),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], AuthByLoginStrategy);
exports.AuthByLoginStrategy = AuthByLoginStrategy;


/***/ }),

/***/ "./libs/auth/server-module/src/lib/auth.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const user_decarator_1 = __webpack_require__("./libs/auth/server-module/src/lib/user.decarator.ts");
const common_2 = __webpack_require__("./libs/auth/common/src/index.ts");
let AuthController = class AuthController {
    /**
     * Метод возвращает данные авторизированного пользователя
     * @url /api/auth/user
     * @param user
     * @private
     */
    getUser(user) {
        if (!user) {
            common_1.Logger.warn(`Не удалось аутентифицировать пользователя`, `AuthController.getUser(${user})`);
            throw new common_1.UnauthorizedException();
        }
        return user;
    }
};
(0, tslib_1.__decorate)([
    (0, common_1.Get)('user'),
    (0, tslib_1.__param)(0, (0, user_decarator_1.User)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof common_2.UserInterface !== "undefined" && common_2.UserInterface) === "function" ? _a : Object]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_b = typeof common_2.UserInterface !== "undefined" && common_2.UserInterface) === "function" ? _b : Object)
], AuthController.prototype, "getUser", null);
AuthController = (0, tslib_1.__decorate)([
    (0, common_1.Controller)('auth')
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
const auth_by_login_strategy_1 = __webpack_require__("./libs/auth/server-module/src/lib/auth-by-login.strategy.ts");
let AuthMiddleware = class AuthMiddleware {
    constructor(authByLoginStrategy) {
        this.authByLoginStrategy = authByLoginStrategy;
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
            if (!req.session.cookie.user) {
                const login = (_a = req.headers['X_AUTH_USER']) !== null && _a !== void 0 ? _a : process.env.USER;
                req.session.cookie.user = yield this.authByLoginStrategy.strategy(login);
            }
            next();
        });
    }
};
AuthMiddleware = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof auth_by_login_strategy_1.AuthByLoginStrategy !== "undefined" && auth_by_login_strategy_1.AuthByLoginStrategy) === "function" ? _a : Object])
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
const databases_1 = __webpack_require__("./libs/databases/src/index.ts");
const auth_controller_1 = __webpack_require__("./libs/auth/server-module/src/lib/auth.controller.ts");
const auth_by_login_strategy_1 = __webpack_require__("./libs/auth/server-module/src/lib/auth-by-login.strategy.ts");
const auth_middleware_1 = __webpack_require__("./libs/auth/server-module/src/lib/auth.middleware.ts");
let AuthModule = class AuthModule {
    configure(consumer) {
        consumer.apply(auth_middleware_1.AuthMiddleware).forRoutes({ path: '*', method: common_1.RequestMethod.ALL });
    }
};
AuthModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([databases_1.UserEntity]),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_by_login_strategy_1.AuthByLoginStrategy],
    })
], AuthModule);
exports.AuthModule = AuthModule;


/***/ }),

/***/ "./libs/auth/server-module/src/lib/user.decarator.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = void 0;
const common_1 = __webpack_require__("@nestjs/common");
/**
 * Декоратор пользователя
 * Возможно передать в качестве аргумента имя параметра например - @User('login')
 */
exports.User = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.session.cookie.user;
    return data ? user === null || user === void 0 ? void 0 : user[data] : user;
});


/***/ }),

/***/ "./libs/databases/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
(0, tslib_1.__exportStar)(__webpack_require__("./libs/databases/src/lib/databases.module.ts"), exports);
// Сущности
(0, tslib_1.__exportStar)(__webpack_require__("./libs/databases/src/lib/entities/user.entity.ts"), exports);


/***/ }),

/***/ "./libs/databases/src/lib/databases.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DatabasesModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
let DatabasesModule = class DatabasesModule {
};
DatabasesModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                ssl: {
                    rejectUnauthorized: false,
                },
                host: process.env.DATABASE_HOST,
                port: Number(process.env.DATABASE_PORT),
                database: process.env.DATABASE_NAME,
                username: process.env.DATABASE_USER,
                password: process.env.DATABASE_PASSWORD,
                autoLoadEntities: true,
                synchronize: false,
                retryAttempts: 3,
                logging: process.env.DATABASE_LOGGER ? 'all' : false,
                logger: 'file',
            })
        ]
    })
], DatabasesModule);
exports.DatabasesModule = DatabasesModule;


/***/ }),

/***/ "./libs/databases/src/lib/entities/user.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const class_validator_1 = __webpack_require__("class-validator");
let UserEntity = class UserEntity {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, tslib_1.__metadata)("design:type", Number)
], UserEntity.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(5, 255),
    (0, typeorm_1.Column)({ name: 'login', type: 'varchar', length: 255, unique: true }),
    (0, tslib_1.__metadata)("design:type", String)
], UserEntity.prototype, "login", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(80),
    (0, typeorm_1.Column)({ name: 'firstName', type: 'varchar', length: 80, nullable: false }),
    (0, tslib_1.__metadata)("design:type", String)
], UserEntity.prototype, "firstName", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(80),
    (0, typeorm_1.Column)({ name: 'lastName', type: 'varchar', length: 80, nullable: false }),
    (0, tslib_1.__metadata)("design:type", String)
], UserEntity.prototype, "lastName", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(80),
    (0, typeorm_1.Column)({ name: 'middleName', type: 'varchar', length: 80, nullable: true, default: null }),
    (0, tslib_1.__metadata)("design:type", String)
], UserEntity.prototype, "middleName", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ name: 'fullName', type: 'varchar', length: 255, nullable: false }),
    (0, tslib_1.__metadata)("design:type", String)
], UserEntity.prototype, "fullName", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.CreateDateColumn)(),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], UserEntity.prototype, "createDate", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, tslib_1.__metadata)("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], UserEntity.prototype, "updateDate", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ name: 'isActive', type: 'boolean', nullable: false, default: true }),
    (0, tslib_1.__metadata)("design:type", Boolean)
], UserEntity.prototype, "isActive", void 0);
UserEntity = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)('users')
], UserEntity);
exports.UserEntity = UserEntity;


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

/***/ "@nestjs/serve-static":
/***/ ((module) => {

module.exports = require("@nestjs/serve-static");

/***/ }),

/***/ "@nestjs/typeorm":
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),

/***/ "class-validator":
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),

/***/ "express-session":
/***/ ((module) => {

module.exports = require("express-session");

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
const session = __webpack_require__("express-session");
function bootstrap() {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        const configService = app.get(config_1.ConfigService);
        const port = yield configService.get('PORT');
        const sessionSecret = yield configService.get('SESSION_SECRET');
        const globalPrefix = 'api';
        // Инициализируем глобальный префикс для всех REST'ов
        app.setGlobalPrefix(globalPrefix);
        // Промежуточный обработчик сессий
        app.use(session({
            secret: sessionSecret,
            resave: false,
            saveUninitialized: false,
        }));
        // Инициализируем глобальную валидацию всех входящих данных через DTO
        app.useGlobalPipes(new common_1.ValidationPipe());
        // Стартуем сервер
        yield app.listen(port);
        common_1.Logger.log(`Сервер запущен: http://localhost:${port}/${globalPrefix}`);
    });
}
bootstrap().catch(err => {
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