declare class UtilityError extends Error {
    name: string;
    constructor(message: string);
}
declare class MissingParamError extends Error {
    name: string;
    constructor(message: string);
}
declare class UnexpectedError extends Error {
    name: string;
    constructor(res: any);
}
export { UtilityError, MissingParamError, UnexpectedError };
