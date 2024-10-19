# UpdateEdgeConfigRequest

## Example Usage

```typescript
import { UpdateEdgeConfigRequest } from "@vercel/sdk/models/operations/updateedgeconfig.js";

let value: UpdateEdgeConfigRequest = {
  edgeConfigId: "<id>",
};
```

## Fields

| Field                                                                                            | Type                                                                                             | Required                                                                                         | Description                                                                                      |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| `edgeConfigId`                                                                                   | *string*                                                                                         | :heavy_check_mark:                                                                               | N/A                                                                                              |
| `teamId`                                                                                         | *string*                                                                                         | :heavy_minus_sign:                                                                               | The Team identifier to perform the request on behalf of.                                         |
| `slug`                                                                                           | *string*                                                                                         | :heavy_minus_sign:                                                                               | The Team slug to perform the request on behalf of.                                               |
| `requestBody`                                                                                    | [operations.UpdateEdgeConfigRequestBody](../../models/operations/updateedgeconfigrequestbody.md) | :heavy_minus_sign:                                                                               | N/A                                                                                              |