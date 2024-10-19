# GetAllChecksCLS

## Example Usage

```typescript
import { GetAllChecksCLS } from "@vercel/sdk/models/operations/getallchecks.js";

let value: GetAllChecksCLS = {
  value: 3179.83,
  source: "web-vitals",
};
```

## Fields

| Field                                                                                                      | Type                                                                                                       | Required                                                                                                   | Description                                                                                                |
| ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `value`                                                                                                    | *number*                                                                                                   | :heavy_check_mark:                                                                                         | N/A                                                                                                        |
| `previousValue`                                                                                            | *number*                                                                                                   | :heavy_minus_sign:                                                                                         | N/A                                                                                                        |
| `source`                                                                                                   | [operations.GetAllChecksChecksResponseSource](../../models/operations/getallcheckschecksresponsesource.md) | :heavy_check_mark:                                                                                         | N/A                                                                                                        |