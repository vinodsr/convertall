import { UrlHashConverterData } from "@src/Interfaces/UrlHJashConverterData";

/**
 * Url hash parser utility
 */
export class ParseUrlHash {
  /**
   * Parse the component information from hash
   *
   * @static
   * @param {string} $hash location has
   * @return {*}  {UrlHashConverterData[]}
   * @memberof ParseUrlHash
   */
  static parse($hash: string): UrlHashConverterData[] {
    const components: UrlHashConverterData[] = [];
    if ($hash.length > 0) {
      // the first character is # ignore it
      const hash = $hash.substr(1);
      console.log("Working on hash", hash);
      const componentDatas = hash.split(";");
      for (const componentData of componentDatas) {
        const componentSplit = componentData?.split(":");
        if (componentSplit.length !== 2) {
          continue;
        }
        const componentId = componentSplit[0];
        const componentConfig = componentSplit[1];
        const componentConfigValues =
          componentConfig.trim().length === 0
            ? []
            : componentConfig?.split(",");
        components.push({
          converterKey: componentId,
          settings: componentConfigValues,
        });
      }
    }
    return components;
  }
}
