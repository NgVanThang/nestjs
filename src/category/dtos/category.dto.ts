import { IsNotEmpty } from "class-validator"

export class CreateCategoryDTO {
    @IsNotEmpty()
    name: string

    status: boolean
}

export class UpdateCategoryDTO {
    name: string

    status: boolean
}