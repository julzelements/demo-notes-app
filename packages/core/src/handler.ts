
export default function handler(lambda: any) {
    return async function (event: any, context: any) {
        let body, statusCode;
        try {
            body = await lambda(event, context);
            statusCode = 200;
        } catch (e) {
            console.error(e)
            return {
                statusCode: 500,
                body: JSON.stringify({ error: e })
            }
        }

        return {
            statusCode: 200,
            body: JSON.stringify(body)
        }
    }
}
