import { DeepPartial } from "typeorm";
import { Entity2 } from "../entity/Entity2";

/**
 * Data transfer object (DTO) with expected fields for tokens.
 */
export class TokenResponseDto {

    public idToken: string;
    public employeeDetails?: Entity2;

}