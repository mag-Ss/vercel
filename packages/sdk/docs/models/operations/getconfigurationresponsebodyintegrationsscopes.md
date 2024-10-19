# GetConfigurationResponseBodyIntegrationsScopes

## Example Usage

```typescript
import { GetConfigurationResponseBodyIntegrationsScopes } from "@vercel/sdk/models/operations/getconfiguration.js";

let value: GetConfigurationResponseBodyIntegrationsScopes = {
  added: [
    "read:project",
  ],
  upgraded: [
    "read-write:integration-resource",
  ],
};
```

## Fields

| Field                                                                                                                                        | Type                                                                                                                                         | Required                                                                                                                                     | Description                                                                                                                                  |
| -------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `added`                                                                                                                                      | [operations.GetConfigurationResponseBodyIntegrationsAdded](../../models/operations/getconfigurationresponsebodyintegrationsadded.md)[]       | :heavy_check_mark:                                                                                                                           | N/A                                                                                                                                          |
| `upgraded`                                                                                                                                   | [operations.GetConfigurationResponseBodyIntegrationsUpgraded](../../models/operations/getconfigurationresponsebodyintegrationsupgraded.md)[] | :heavy_check_mark:                                                                                                                           | N/A                                                                                                                                          |