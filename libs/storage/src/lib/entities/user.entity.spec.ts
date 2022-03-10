import { Test } from "@nestjs/testing";
import { StorageModule } from '../storage.module';
import { UserEntity } from './user.entity';
import { UserPasswordEntity } from './user-password.entity';
import { TypeOrmModule } from "@nestjs/typeorm";
import { BadRequestException } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

describe('UserEntity', () => {
  beforeAll(async () => {
    await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        StorageModule,
        TypeOrmModule.forFeature([UserEntity, UserPasswordEntity]),
      ],
    }).compile();
  });

  describe('createUser', () => {
    it('должно создать нового пользователя', async () => {
      const result = await UserEntity.createUser('test@test.ru', 'test', 'testtest');
      expect(result).toBeInstanceOf(UserEntity);
    });

    it('должно создать нового пользователя', async () => {
      const result = await UserEntity.createUser('zakharoff.am@ya.ru', 'zakharoffam', 'zakharoffam');
      expect(result).toBeInstanceOf(UserEntity);
    });

    it('должно создать нового пользователя с именем 2', async () => {
      const result = await UserEntity.createUser('zakharoff2.am@ya.ru', 'zakharoffam', 'zakharoffam');
      expect(result.name).toEqual('zakharoffam - 2');
    });

    it('должно вернуть ошибку о уже зарегистрированном пользователе', async () => {
      try {
        await UserEntity.createUser('zakharoff.am@ya.ru', 'zakharoffam', 'zakharoffam');
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
      }
    });

    it('должно вернуть список всех зарегистрированных активных пользователей', async () => {
      const result = await UserEntity.find({ where: { isActive: true }});
      result.map(user => {
        expect(user).toBeInstanceOf(UserEntity);
      });
    });

    it('должно удалить всех пользователей', async () => {
      await UserPasswordEntity.delete({});
      await UserEntity.delete({});
      const result = await UserEntity.find();
      expect(result.length).toEqual(0);
    });
  });
});
