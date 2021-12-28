import {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
  } from 'http-status-codes';
  
  class MyError extends Error {
    constructor(message?: string) {
      super(message);
      this.name = this.constructor.name;
      Error.captureStackTrace(this, MyError);
    }
  }
  
  class HttpError extends MyError {
    constructor(message: string, public statusCode: StatusCodes ) {
      super(message);
      this.statusCode = statusCode;
    }
  }
  
  export default HttpError;