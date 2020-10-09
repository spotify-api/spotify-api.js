"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnexpectedError = exports.MissingParamError = exports.UtilityError = void 0;
class UtilityError extends Error {
    constructor(message) {
        super(message);
        this.name = 'UtilityError';
    }
}
exports.UtilityError = UtilityError;
class MissingParamError extends Error {
    constructor(message) {
        super(message);
        this.name = 'MissingParamError';
    }
}
exports.MissingParamError = MissingParamError;
class UnexpectedError extends Error {
    constructor(res) {
        super(res.response ? JSON.stringify(res.response.data) : res);
        this.name = 'UnexpectedError';
    }
}
exports.UnexpectedError = UnexpectedError;
//# sourceMappingURL=Error.js.map