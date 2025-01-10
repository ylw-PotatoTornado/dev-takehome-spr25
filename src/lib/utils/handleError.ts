import { ServerResponseBuilder } from "../builders/serverResponseBuilder";
import { InputException } from "../errors/inputExceptions";
import { ResponseType } from "../types/apiResponse";

export const handleError = (e: any) => {
    if (e instanceof InputException) {
        return new ServerResponseBuilder(ResponseType.INVALID_INPUT).build();
      }
      return new ServerResponseBuilder(ResponseType.UNKNOWN_ERROR).build();
}