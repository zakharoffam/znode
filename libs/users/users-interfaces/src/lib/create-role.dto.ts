import { RoleEntity } from "@uparm-automation/databases";
import { IsOptional, IsString } from "class-validator";

export class CreateRoleDto extends RoleEntity {
  constructor() {
    super();
  }

  @IsOptional()
  @IsString()
  addViewPermission: string;
}
