# UpdateCheckFCP

## Example Usage

```typescript
import { UpdateCheckFCP } from "@vercel/sdk/models/operations/updatecheck.js";

let value: UpdateCheckFCP = {
  value: 6994.79,
  source: "web-vitals",
};
```

## Fields

| Field                                                                                                    | Type                                                                                                     | Required                                                                                                 | Description                                                                                              |
| -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `value`                                                                                                  | *number*                                                                                                 | :heavy_check_mark:                                                                                       | N/A                                                                                                      |
| `previousValue`                                                                                          | *number*                                                                                                 | :heavy_minus_sign:                                                                                       | N/A                                                                                                      |
| `source`                                                                                                 | [operations.UpdateCheckChecksResponseSource](../../models/operations/updatecheckchecksresponsesource.md) | :heavy_check_mark:                                                                                       | N/A                                                                                                      |