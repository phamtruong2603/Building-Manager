import { Response } from 'express';

  
type Send<ResBody = any, T = Response<ResBody>> = (body?: ResBody) => T;

interface Data <T> {
    success: boolean;

    token?: string;
    message?: string;
    data?: T | T[];
}
export interface ResponseType<T> extends Response {
    json: Send<Data<T>, this>
}