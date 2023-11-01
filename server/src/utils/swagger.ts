import { Type, applyDecorators } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiProperty,
  getSchemaPath,
  ApiResponseOptions,
  ApiExtraModels,
} from '@nestjs/swagger';

export class UnifyResponseDto<TData> {
  @ApiProperty()
  readonly error: number;

  @ApiProperty()
  readonly error_msg: string | null;

  readonly data: TData;
}

const getApiResponseOptions = <TModel extends Type<any>>(
  model?: TModel,
): ApiResponseOptions => {
  const schema = model
    ? {
        properties: {
          data: {
            type: 'object',
            $ref: getSchemaPath(model),
          },
          error: {
            type: 'integer',
          },
          error_msg: {
            type: 'string',
          },
        },
        $unifiedResRef: getSchemaPath(model) + 'UnifiedRes',
      }
    : {
        properties: {
          error: {
            type: 'integer',
          },
          error_msg: {
            type: 'string',
          },
        },
        $unifiedResRef: 'NullUnifiedRes',
      };
  return {
    schema,
  };
};

export const ApiUnifiedOkResponse = <TModel extends Type<any>>(
  model?: TModel,
) => {
  return model
    ? applyDecorators(
        ApiExtraModels(model),
        ApiOkResponse(getApiResponseOptions(model)),
      )
    : applyDecorators(ApiOkResponse(getApiResponseOptions(model)));
};

export const ApiUnifiedCreatedResponse = <TModel extends Type<any>>(
  model?: TModel,
) => {
  return model
    ? applyDecorators(
        ApiExtraModels(model),
        ApiCreatedResponse(getApiResponseOptions(model)),
      )
    : applyDecorators(ApiCreatedResponse(getApiResponseOptions(model)));
};
