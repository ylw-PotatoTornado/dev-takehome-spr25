import { HTTP_STATUS_CODE } from "../constants/apiResponses";

export abstract class UserException extends Error {
  code: HTTP_STATUS_CODE;
  constructor(message: string, code: HTTP_STATUS_CODE) {
    super(message);
    this.code = code;
  }
}

export class InvalidInputError extends UserException {
  constructor(problem: string) {
    super(
      `Invalid input provided in ${problem}.`,
      HTTP_STATUS_CODE.BAD_REQUEST
    );
  }
}
