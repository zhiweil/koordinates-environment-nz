import { APIKind, KoordinatesDataset } from "@zhiweiliu/koordinates-base";
export let environmentNzHost: string = "https://data.mfe.govt.nz";
export let initialDatasetLocation: string =
  "https://s3.ap-southeast-2.amazonaws.com/environment-nz-datasets.zhiweiliu.com";

export let LinzDatasets = [
  new KoordinatesDataset({
    koordinatesHost: environmentNzHost,
    name: "Daily temperature 30 sites, state, 1909 - 2022",
    layerId: 115376,
    apiKind: APIKind.WFS,
    apiVersion: "v1",
    version: "v2.0.0",
    initialDatasetTs: "2023-12-07T00:00:00Z",
    initialDatasetLocation,
    initialDataset: "daily-temperature-30-sites-state-1909-2022.csv",
    hasSpatialInformation: true,
  }),
  new KoordinatesDataset({
    koordinatesHost: environmentNzHost,
    name: "Annual and seasonal temperatures at 30 sites, trends, 1972-2022",
    layerId: 115411,
    apiKind: APIKind.WFS,
    apiVersion: "v1",
    version: "v2.0.0",
    initialDatasetTs: "2023-12-11T00:00:00Z",
    initialDatasetLocation,
    initialDataset:
      "annual-and-seasonal-temperatures-at-30-sites-trends-1972-202.csv",
    hasSpatialInformation: true,
  }),
  new KoordinatesDataset({
    koordinatesHost: environmentNzHost,
    name: "Annual and seasonal temperatures at 30 sites, state 1972 - 2022",
    layerId: 115410,
    apiKind: APIKind.WFS,
    apiVersion: "v1",
    version: "v2.0.0",
    initialDatasetTs: "2023-12-11T00:00:00Z",
    initialDatasetLocation,
    initialDataset:
      "annual-and-seasonal-temperatures-at-30-sites-state-1972-2022.csv",
    hasSpatialInformation: true,
  }),
  new KoordinatesDataset({
    koordinatesHost: environmentNzHost,
    name: "National Temperature, trends, 1909-2022",
    tableId: 115381,
    apiKind: APIKind.WFS,
    apiVersion: "v1",
    version: "v2.0.0",
    initialDatasetTs: "2023-12-12T00:00:00Z",
    initialDatasetLocation,
    initialDataset: "national-temperature-trends-1909-2022.csv",
  }),
  new KoordinatesDataset({
    koordinatesHost: environmentNzHost,
    name: "National temperature, state, 1909-2022",
    tableId: 115370,
    apiKind: APIKind.WFS,
    apiVersion: "v1",
    version: "v2.0.0",
    initialDatasetTs: "2023-12-12T00:00:00Z",
    initialDatasetLocation,
    initialDataset: "national-temperature-state-1909-2022.csv",
  }),
  new KoordinatesDataset({
    koordinatesHost: environmentNzHost,
    name: "Daily rainfall at 30 sites, state, 1960 - 2022",
    layerId: 115363,
    apiKind: APIKind.WFS,
    apiVersion: "v1",
    version: "v2.0.0",
    initialDatasetTs: "2023-12-12T00:00:00Z",
    initialDatasetLocation,
    initialDataset: "daily-rainfall-at-30-sites-state-1960-2022.csv",
    hasSpatialInformation: true,
  }),
];
