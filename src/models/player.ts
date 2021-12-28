import { provide } from 'inversify-binding-decorators';
import {
    MinLength,
    MaxLength,
    validate,
    validateOrReject,
    Contains,
    IsInt,
    Length,
    IsEmail,
    IsFQDN,
    IsDate,
    Min,
    Max
} from "class-validator";
import { Type } from "class-transformer";
import TYPES from '../constants/type';

@provide(TYPES.Player)
export class Player {
    constructor(
        public email: string,
        public name: string
    ) {

    }
}

export class PlayerRequestModel {
    //@Type(() => String)
    @MinLength(5, {
        // here, $constraint1 will be replaced with "10", and $value with actual supplied value
        message: 'Title is too short. Minimal length is $constraint1 characters, but actual is $value',
      })
    // @MaxLength(20, {
    //     // here, $constraint1 will be replaced with "10", and $value with actual supplied value
    //     message: 'Title is too long. Maximal length is $constraint1 characters, but actual is $value',
    //   })
    name: string;
}