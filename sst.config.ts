import { SSTConfig } from "sst";
import { StorageStack } from "./stacks/StorageStack"
import { ApiStack } from "./stacks/ApiStack";

export default {
  config(_input) {
    return {
      name: "notes",
      region: "us-east-1",
    };
  },
  stacks(app) {
    if (app.stage !== "prod") {
      app.setDefaultRemovalPolicy("destroy");
    }
    app
    .stack(StorageStack)
    .stack(ApiStack)
  }
} satisfies SSTConfig;
