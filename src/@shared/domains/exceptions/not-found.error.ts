import {EntityInterface} from "../entity.interface";

export class NotFoundError extends Error {
    constructor(
        id: any[] | any,
        entityClass: new (...args: any[]) => EntityInterface,
    ) {
        const idsMessage = Array.isArray(id) ? id.join(', ') : id;
        super(`${entityClass.name} Not Found using ID ${idsMessage}`);
        this.name = 'NotFoundError';
    }
}