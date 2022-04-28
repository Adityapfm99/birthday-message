// export class CreateUserDto {
//   firstName: string;
//   lastName: string;
//   location: string;
//   birthDate: string;

import { ApiProperty } from "@nestjs/swagger";

// }
export class CreateUserDto {
  @ApiProperty({
    example: "firstName",
  })
  firstName: string;

  @ApiProperty({
    example: "lastName",
  })
  lastName: string;

  @ApiProperty({
      example: "jakarta",
  })
  location: string;

  @ApiProperty({
      example: "2001-01-01",
  })
  birthDate: string;

}