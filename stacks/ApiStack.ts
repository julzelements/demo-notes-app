import { Api, StackContext, use } from "sst/constructs"
import { StorageStack } from "./StorageStack"

export function ApiStack({ stack }: StackContext) {
    const { table } = use(StorageStack)

    const api = new Api(stack, "Api", {
        defaults: {
            function: {
                bind: [table],
            },
        },
        routes: {
            "GET /notes": "packages/functions/src/list.main",
            "GET /notes/{id}": "packages/functions/src/get.main",
            "POST /notes": "packages/functions/src/create.main",
        },
    });

    stack.addOutputs({
        ApiEndpoint: api.url,
    });

    return {
        api,
    };
}