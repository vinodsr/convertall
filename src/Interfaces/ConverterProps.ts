import { FC } from "react";

/**
 * Interface for the Converter Component
 */
export interface ConverterProps {
  /**
   * Converter ID
   *
   * @type {string}
   * @memberof ConverterProps
   */
  converterId: string;
  /**
   * Key for the converter
   *
   * @type {string}
   * @memberof ConverterBaseProps
   */
  converterKey: string;
  /**
   * Text for the converter
   *
   * @type {string}
   * @memberof ConverterProps
   */
  text: string;
  /**
   * On close handler
   *
   * @type {Function}
   * @memberof ConverterProps
   */
  onClose: (componentId: string) => void;
  /**
   * Color of the icon
   *
   * @type {string}
   * @memberof ConverterProps
   */
  color?: string;
  /**
   * Title of the card
   *
   * @type {string}
   * @memberof ConverterProps
   */
  title?: string;
  /**
   * Settings Component
   *
   * @type {FC<{ errors: any; control: any }>}
   * @memberof ConverterProps
   */
  settingsComponent?: FC<{ errors: any; control: any }>;

  /**
   * Settings as string array
   *
   * @type {string[]}
   * @memberof ConverterProps
   */
  settingArr?: string[];
  /**
   * On settings Update
   *
   * @memberof ConverterProps
   */
  onSettingsUpdate?: (settings: string[]) => void;
}
