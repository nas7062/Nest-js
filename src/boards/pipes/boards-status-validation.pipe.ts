import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { BoardStatus } from "../boards.status.enum";

export class BoardsStatusValidationPipe implements PipeTransform {

  readonly StatusOptions = [
    BoardStatus.PUBLIC,
    BoardStatus.PRIVATE
  ]

  transform(value: any, metadata: ArgumentMetadata) {
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`{value} is not Status Options`)
    }
    return value;
  }

  private isStatusValid(status: any): boolean {
    const index = this.StatusOptions.indexOf(status);
    return index !== -1;
  }
}