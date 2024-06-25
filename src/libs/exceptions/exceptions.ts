import { ExceptionBase } from '@libs/exceptions/exception.base';
import { ExceptionCodes } from '@libs/exceptions/exception.codes';


export class ArgumentInvalidException extends ExceptionBase {
  readonly code = ExceptionCodes.ArgumentInvalid;
}

export class ArgumentNotProvidedException extends ExceptionBase {
  readonly code = ExceptionCodes.ArgumentNotProvided;
}

export class ArgumentOutOfRangeException extends ExceptionBase {
  readonly code = ExceptionCodes.ArgumentOutOfRange;
}

export class ConflictException extends ExceptionBase {
  readonly code = ExceptionCodes.Conflict;
}

export class NotFoundException extends ExceptionBase {
  static readonly message = 'Not found';

  constructor(message = NotFoundException.message) {
    super(message);
  }

  readonly code = ExceptionCodes.NotFound;
}

export class InternalServerErrorException extends ExceptionBase {
  static readonly message = 'Internal server error';

  constructor(message = InternalServerErrorException.message) {
    super(message);
  }

  readonly code = ExceptionCodes.InternalServerError;
}
