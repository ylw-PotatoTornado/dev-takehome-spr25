import { ServerResponseBuilder } from "../builders/serverResponseBuilder";
import { InputException } from "../errors/inputExceptions";
import { ResponseType } from "../types/apiResponse";

export function handleError(e: any): Response {
    if (e instanceof InputException) {
        return new ServerResponseBuilder(ResponseType.INVALID_INPUT).build();
      }
      return new ServerResponseBuilder(ResponseType.UNKNOWN_ERROR).build();
}