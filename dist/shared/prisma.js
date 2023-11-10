"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../config"));
const prisma = new client_1.PrismaClient({
    errorFormat: 'minimal',
});
prisma.$use((params, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if ((params === null || params === void 0 ? void 0 : params.model) === 'User' && (params === null || params === void 0 ? void 0 : params.action) === 'create') {
        params.args.data.password = yield bcrypt_1.default.hash(params.args.data.password, Number(config_1.default.bycrypt_salt_rounds));
    }
    const result = yield next(params);
    if ((params === null || params === void 0 ? void 0 : params.model) === 'User' &&
        ((_b = (_a = params === null || params === void 0 ? void 0 : params.args) === null || _a === void 0 ? void 0 : _a.select) === null || _b === void 0 ? void 0 : _b.password) !== true &&
        result) {
        if (Array.isArray(result)) {
            result.forEach(user => {
                delete user.password;
            });
        }
        else if (typeof result === 'object' && result !== null) {
            delete result.password;
        }
    }
    return result;
}));
exports.default = prisma;
