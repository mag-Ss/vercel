# CreateCheckLCP

## Example Usage

```typescript
import { CreateCheckLCP } from "@vercel/sdk/models/operations/createcheck.js";

let value: CreateCheckLCP = {
  value: 8209.93,
  source: "web-vitals",
};
```

## Fields

| Field                                                                                    | Type                                                                                     | Required                                                                                 | Description                                                                              |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `value`                                                                                  | *number*                                                                                 | :heavy_check_mark:                                                                       | N/A                                                                                      |
| `previousValue`                                                                          | *number*                                                                                 | :heavy_minus_sign:                                                                       | N/A                                                                                      |
| `source`                                                                                 | [operations.CreateCheckChecksSource](../../models/operations/createcheckcheckssource.md) | :heavy_check_mark:                                                                       | N/A                                                                                      |