import { HttpStatus } from "@nestjs/common";

export interface HttpResponse<T> {
    message: string;
    values?: T;
    code: HttpStatus;
    query?: any;
};
