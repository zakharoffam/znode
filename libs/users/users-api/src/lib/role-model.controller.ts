import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
import { RoleModelService } from "./role-model.service";
import { CreateRoleDto } from "@uparm-automation/users/users-interfaces";
import { RoleEntity } from "@uparm-automation/databases";


@Controller('role-model')
export class RoleModelController {
  constructor(@Inject(RoleModelService) private roleModelService: RoleModelService) {}

  /**
   * Создать роль
   * @url /api/role-model/role
   * @param data
   * @private
   */
  @Post('roles')
  private async createRole(@Body() data: CreateRoleDto): Promise<RoleEntity> {
    return await this.roleModelService.createRole(data);
  }


  @Get('roles')
  private async getRoles() {
    return this.roleModelService.findAllRoles();
  }
}
