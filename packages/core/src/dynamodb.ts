
import { DocumentClient } from "aws-sdk/clients/dynamodb";

const client = new DocumentClient();

export default {
    get: (params: any) => client.get(params).promise(),
    put: (params: any) => client.put(params).promise(),
    query: (params: any) => client.query(params).promise(),
    update: (params: any) => client.update(params).promise(),
    delete: (params: any) => client.delete(params).promise(),
};
