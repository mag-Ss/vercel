# UpdateCheckLCP

## Example Usage

```typescript
import { UpdateCheckLCP } from "@vercel/sdk/models/operations/updatecheck.js";

let value: UpdateCheckLCP = {
  value: 2974.37,
  source: "web-vitals",
};
```

## Fields

| Field                                                                                                          | Type                                                                                                           | Required                                                                                                       | Description                                                                                                    |
| -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `value`                                                                                                        | *number*                                                                                                       | :heavy_check_mark:                                                                                             | N/A                                                                                                            |
| `previousValue`                                                                                                | *number*                                                                                                       | :heavy_minus_sign:                                                                                             | N/A                                                                                                            |
| `source`                                                                                                       | [operations.UpdateCheckChecksResponse200Source](../../models/operations/updatecheckchecksresponse200source.md) | :heavy_check_mark:                                                                                             | N/A                                                                                                            |