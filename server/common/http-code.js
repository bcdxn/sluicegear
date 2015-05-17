'use strict';

var HttpCode = {};

HttpCode.Okay         = {};
HttpCode.Okay.CODE    = 200;
HttpCode.Okay.MESSAGE = 'OK';

HttpCode.Created         = {};
HttpCode.Created.CODE    = 201;
HttpCode.Created.MESSAGE = 'Created';

HttpCode.BadRequest         = {};
HttpCode.BadRequest.CODE    = 400;
HttpCode.BadRequest.MESSAGE = 'Bad Request';

HttpCode.Forbidden         = {};
HttpCode.Forbidden.CODE    = 403;
HttpCode.Forbidden.MESSAGE = 'Forbidden';

HttpCode.NotFound         = {};
HttpCode.NotFound.CODE    = 404;
HttpCode.NotFound.MESSAGE = 'Not Found';

HttpCode.MethodNotAllowed         = {};
HttpCode.MethodNotAllowed.CODE    = 405;
HttpCode.MethodNotAllowed.MESSAGE = 'Method Not Allowed';

HttpCode.Conflict         = {};
HttpCode.Conflict.CODE    = 409;
HttpCode.Conflict.MESSAGE = 'Conflict';

HttpCode.InternalServerError         = {};
HttpCode.InternalServerError.CODE    = 500;
HttpCode.InternalServerError.MESSAGE = 'Internal Server Errror';

module.exports = HttpCode;