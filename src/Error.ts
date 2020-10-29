class UtilityError extends Error{
  
  name: string;

  constructor(message: string) {
    super(message);
    this.name = 'UtilityError';
  };

};

class MissingParamError extends Error{

  name: string;

  constructor(message: string) {
    super(message);
    this.name = 'MissingParamError';
  };

};

class UnexpectedError extends Error{

  name: string;

  constructor(res: any) {
    super(res.response ? JSON.stringify(res.response.data) : res);
    this.name = 'UnexpectedError';
  };

};

export {
  UtilityError,
  MissingParamError,
  UnexpectedError
}
