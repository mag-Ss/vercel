# TwoType

The type of environment variable

## Example Usage

```typescript
import { TwoType } from "@vercel/sdk/models/operations/createprojectenv.js";

let value: TwoType = "plain";
```

## Values

```typescript
"system" | "secret" | "encrypted" | "plain" | "sensitive"
```