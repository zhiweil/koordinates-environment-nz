import { KoordinatesDataset } from "@zhiweiliu/koordinates-base";
import { LinzDatasets } from "../src/index";
import apiKey from "./api-key";

const TIMEOUT: number = 60000;
const datasetName =
  "Annual and seasonal temperatures at 30 sites, state 1972 - 2022";

test(
  "Capabilites endpoint",
  async () => {
    let dt30sites: KoordinatesDataset = LinzDatasets.find(
      (d) => d.getName() === datasetName
    ) as KoordinatesDataset;
    expect(dt30sites).not.toBe(undefined);

    let json = await dt30sites.getLayerCapabilitiesJson(apiKey);
    expect(json["wfs:WFS_Capabilities"]["$"]["version"]).toBe("2.0.0");

    let xml = await dt30sites.getLayerCapabilitiesXml(apiKey);
    expect(xml).toContain('wfs:WFS_Capabilities version="2.0.0"');

    xml = await dt30sites.getAllCapabilitiesXml(apiKey);
    expect(xml).toContain("wfs:WFS_Capabilities");

    json = await dt30sites.getAllCapabilitiesJson(apiKey);
    expect(json["wfs:WFS_Capabilities"]["$"]["version"]).toBe("2.0.0");

    // CS-W endpoint
    xml = await dt30sites.getWebCatalogServicesXml();
    expect(xml).toContain("csw:Capabilities");
    json = await dt30sites.getWebCatalogServicesJson();
    expect(json["csw:Capabilities"]).toBeDefined();
  },
  TIMEOUT
);

test(
  "Changesets endpoint",
  async () => {
    let dt30sites: KoordinatesDataset = LinzDatasets.find(
      (d) => d.getName() === datasetName
    ) as KoordinatesDataset;
    expect(dt30sites).not.toBe(undefined);

    try {
      await dt30sites.getWfsChangesets(
        apiKey,
        "2023-01-01T00:00:00Z",
        "2023-01-15T00:00:00Z"
      );
    } catch (ex) {
      expect((ex as Error).message).toBe(
        "Changesets API is not supported by dataset Annual and seasonal temperatures at 30 sites, state 1972 - 2022."
      );
    }
  },
  TIMEOUT
);

test(
  "Spatial data query endpoints",
  async () => {
    let dt30sites: KoordinatesDataset = LinzDatasets.find(
      (d) => d.getName() === datasetName
    ) as KoordinatesDataset;
    expect(dt30sites).not.toBe(undefined);

    let spatialDataJson = await dt30sites.queryWfsSpatialApiJson(
      apiKey,
      -37.78828,
      175.28011,
      100,
      10000
    );
    expect(
      spatialDataJson["vectorQuery"]["layers"][`${dt30sites.getLayerId()}`]
    ).toBeDefined();

    let spatialDataXml = await dt30sites.queryWfsSpatialApiXml(
      apiKey,
      -37.78828,
      175.28011,
      100,
      10000
    );
    expect(spatialDataXml).toContain("kx:vectorQuery");
    expect(spatialDataXml).toContain("gml:featureMember");
  },
  TIMEOUT
);

test(
  "Initial dataset",
  async () => {
    let dt30sites: KoordinatesDataset = LinzDatasets.find(
      (d) => d.getName() === datasetName
    ) as KoordinatesDataset;
    expect(dt30sites).not.toBe(undefined);

    let actualCount = await dt30sites.getInitialDatasetCount();
    console.log(`Initial dataset for ${dt30sites.getName()} is ${actualCount}`);
    const batchSize = 100000;
    let start = 0;
    let count = 0;
    while (start < actualCount) {
      let dataset = await dt30sites.getInitialDatasetInBatch(start, batchSize);
      count += dataset.length;
      start += dataset.length;
      console.log(`Loaded ${count} out of ${actualCount} records!`);
    }
    expect(actualCount).toBe(count);
  },
  TIMEOUT * 5
);
