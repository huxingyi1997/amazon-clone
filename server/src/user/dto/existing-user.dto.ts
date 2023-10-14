import { OmitType } from '@nestjs/swagger';

import { NewUserDTO } from './new-user.dto';

export class ExistingUserDTO extends OmitType(NewUserDTO, ['name']) {}
