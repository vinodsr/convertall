import { Units } from './Units';
/**
 * Convert value in to different formats
 *
 * @export
 * @param {number} value
 * @param {string} sourceUnit
 * @param {string} targetUnit
 * @return {*}  {number}
 */
export function ConvertUnit(
  value: number,
  sourceUnit: string,
  targetUnit: string
): number {
  return (value * Units[sourceUnit].factor) / Units[targetUnit].factor;
}
