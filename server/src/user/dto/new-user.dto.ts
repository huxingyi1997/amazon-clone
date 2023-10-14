import { OmitType } from '@nestjs/swagger';

import { User } from '../user.schema';

export class NewUserDTO extends OmitType(User, ['_id']) {}
