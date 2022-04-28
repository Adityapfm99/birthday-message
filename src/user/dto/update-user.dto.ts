import { ApiProperty } from "@nestjs/swagger";


// export class UpdateUserDto {
//     firstName: string;
//     lastName: string;
//     location: string;
//     birthDate: string;
//   }
  
  export class UpdateUserDto {
    @ApiProperty()
    firstName: string;

    @ApiProperty()
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
  