import * as uuid from "uuid";
import { Table } from "sst/node/table"
import handler from "@notes/core/handler"
import dynamoDb from "@notes/core/dynamodb"

export const main = handler(async(event: any) => {
    const data = JSON.parse(event.body)
    const params = {
        TableName: Table.Notes.tableName,
        Item: {
            // Federated Identity id (Identity Pool user id) (could be facebook id?)
            // Not the id from the user pool.
            userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId,
            noteId: uuid.v1(),
            content: data.content,
            attachment: data.attachment,
            createdAt: Date.now(),
        },
    }
    
    await dynamoDb.put(params);

    return params.Item;
})



