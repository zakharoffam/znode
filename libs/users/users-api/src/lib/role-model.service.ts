import { BadRequestException, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PermissionEntity, RoleEntity } from "@uparm-automation/databases";
import { Repository } from "typeorm";
import { validate } from "class-validator";
import { CreateRoleDto, UserInterface } from "@uparm-automation/users/users-interfaces";

@Injectable()
export class RoleModelService {
  constructor(
    @InjectRepository(RoleEntity) private rolesRepository: Repository<RoleEntity>,
    @InjectRepository(PermissionEntity) private permissionsRepository: Repository<PermissionEntity>,
  ) {}


  /**
   * Создать новую роль
   * @param data
   */
  public async createRole(data: CreateRoleDto): Promise<RoleEntity> {
    const roleName = await this.rolesRepository.findOne({ where: { name: data.name }});
    if (roleName) {
      throw new BadRequestException(`Роль ${data.name} уже существует`);
    }
    let role = new RoleEntity();
    role.name = data.name;
    role.description = data.description;

    await validate(role).then(errors => {
      if (errors.length) {
        throw new BadRequestException(errors);
      }
    });

    try {
      role = await this.rolesRepository.save(role);
      if (data.addViewPermission) {
        const viewPermission = new PermissionEntity();
        viewPermission.role = role;
        viewPermission.name = 'Просмотр';
        viewPermission.description = `Пользователю с ролью "${data.name}" разрешен просмотр.`;
        await this.permissionsRepository.save(viewPermission);
      }
      return await this.rolesRepository.findOne(role.id);
    } catch (err) {
      Logger.error(err, `RolesService.createRole()`);
      throw new InternalServerErrorException(err);
    }
  }


  /**
   * Найти все роли
   */
  public async findAllRoles(): Promise<RoleEntity[]> {
    return await this.rolesRepository.find({ relations: ['permissions'] });
  }


  /**
   * Удалить роль
   * @param id
   */
  public async deleteRole(id: number) {
    // TODO: Реализовать
  }


  /**
   * Добавить разрешение роли
   * @param roleId
   * @param permissionName
   * @param permissionDescription
   */
  public async addPermission(roleId: number, permissionName: string, permissionDescription: string) {
    // TODO: Реализовать
  }


  /**
   * Добавить роль пользователю
   * @param user
   * @param roleId
   */
  public async addRoleUser(user: UserInterface, roleId: number) {
    // TODO: Реализовать
  }


  /**
   * Добавить разрешение пользователю
   * @param user
   * @param permissionId
   */
  public async addPermissionUser(user: UserInterface, permissionId: number) {
    // TODO: Реализовать с проверкой наличия роли у пользователя
  }
}
