import { Test } from "@nestjs/testing";
import { StorageModule, UserEntity, UserPasswordEntity } from "@znode/storage";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { ConfigModule } from "@nestjs/config";

describe('AuthModule', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        StorageModule,
        TypeOrmModule.forFeature([UserEntity, UserPasswordEntity]),
        JwtModule.register({
          secret: 'process.env.JWT_SECRET',
          signOptions: { expiresIn: '60s' },
        }),
      ],
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authService = app.get<AuthService>(AuthService);
    authController = app.get<AuthController>(AuthController);
  });

  describe('AuthService', () => {
    describe('checkEmailAndPassword', () => {
      it('должно вернуть пользовательские данные', async () => {
        const user = await authService.checkEmailAndPassword('zakharoff.am@ya.ru', 'zakharoffam');
        expect(user.name).toEqual('zakharoffam');
        const token = authService.encryptJwt(user);
        expect(token).toBeDefined();
        const checkToken = authService.decryptJwt(token);
        console.log(checkToken);
        expect(checkToken).toBeDefined();
      });
    });
  });

});
