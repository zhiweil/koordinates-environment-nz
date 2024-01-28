import { KoordinatesDataset } from "@zhiweiliu/koordinates-base";
import { environmentNzDatasets } from "../src/index";
import apiKey from "./api-key";

const TIMEOUT: number = 60000;
const datasetName = "National Temperature, trends, 1909-2022";

test(
  "Capabilites endpoint",
  async () => {
    let ntt: KoordinatesDataset = environmentNzDatasets.find(
      (d) => d.getName() === datasetName
    ) as KoordinatesDataset;
    expect(ntt).not.toBe(undefined);

    let json = await ntt.getLayerCapabilitiesJson(apiKey);
    expect(json["wfs:WFS_Capabilities"]["$"]["version"]).toBe("2.0.0");

    let xml = await ntt.getLayerCapabilitiesXml(apiKey);
    expect(xml).toContain('wfs:WFS_Capabilities version="2.0.0"');

    xml = await ntt.getAllCapabilitiesXml(apiKey);
    expect(xml).toContain("wfs:WFS_Capabilities");

    json = await ntt.getAllCapabilitiesJson(apiKey);
    expect(json["wfs:WFS_Capabilities"]["$"]["version"]).toBe("2.0.0");

    // CS-W endpoint
    xml = await ntt.getWebCatalogServicesXml();
    expect(xml).toContain("csw:Capabilities");
    json = await ntt.getWebCatalogServicesJson();
    expect(json["csw:Capabilities"]).toBeDefined();
  },
  TIMEOUT
);

test(
  "Changesets endpoint",
  async () => {
    let ntt: KoordinatesDataset = environmentNzDatasets.find(
      (d) => d.getName() === datasetName
    ) as KoordinatesDataset;
    expect(ntt).not.toBe(undefined);

    try {
      await ntt.getWfsChangesets(
        apiKey,
        "2023-01-01T00:00:00Z",
        "2023-01-15T00:00:00Z"
      );
    } catch (ex) {
      expect((ex as Error).message).toBe(
        "Changesets API is not supported by dataset National Temperature, trends, 1909-2022."
      );
    }
  },
  TIMEOUT
);

test(
  "Spatial data query endpoints",
  async () => {
    let ntt: KoordinatesDataset = environmentNzDatasets.find(
      (d) => d.getName() === datasetName
    ) as KoordinatesDataset;
    expect(ntt).not.toBe(undefined);

    try {
      await ntt.queryWfsSpatialApiJson(
        apiKey,
        -37.78828,
        175.28011,
        100,
        10000
      );
    } catch (ex) {
      expect((ex as Error).message).toBe(
        "This dataset does not have spatial information."
      );
    }

    try {
      await ntt.queryWfsSpatialApiXml(apiKey, -37.78828, 175.28011, 100, 10000);
    } catch (ex) {
      expect((ex as Error).message).toBe(
        "This dataset does not have spatial information."
      );
    }
  },
  TIMEOUT
);

test(
  "Initial dataset",
  async () => {
    let dt30sites: KoordinatesDataset = environmentNzDatasets.find(
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
