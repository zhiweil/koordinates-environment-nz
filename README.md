# Koordinates - Environment for New Zealand

The repository provides access to Environment for New Zealand datasets hosted by Koordinates. It is built on module [@zhiweiliu/koordiates-base](https://www.npmjs.com/package/@zhiweiliu/koordinates-base). Please refer to the base module for more details.

## Supported datasets

- Daily temperature 30 sites, state, 1909 - 2022

## Example

```typescript
// import Koordinates modules
import { KoordinatesDataset } from "@zhiweiliu/koordinates-base";
import { LinzDatasets } from "koordinates-environment-nz";

// Koordinates API key, it is recommended to load it at run time instead of hard-coding it in a file
import apiKey from "./api-key";

// Find dataset
let dt30Sites: KoordinatesDataset = LinzDatasets.find(
  (d) => d.getName() === "Daily temperature 30 sites, state, 1909 - 2022"
) as KoordinatesDataset;

// Invoke methods on the dataset object
let json = await dt30Sites.getLayerCapabilitiesJson(apiKey);
console.log(json);
```
