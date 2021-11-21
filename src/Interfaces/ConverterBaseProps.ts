import { FC } from "react";

/**
 * Interface for the Converter Base Component
 */
export interface ConverterBaseProps {
  /**
   * Converter ID (UUID)
   *
   * @type {string}
   * @memberof ConverterBaseProps
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
   * Text to show
   *
   * @type {string}
   * @memberof ConverterBaseProps
   */
  text: string;

  /**
   * On Close handler
   *
   * @type {Function}
   * @memberof ConverterBaseProps
   */
  onClose: (componentId: string) => void;
  /**
   * Color of the heading
   *
   * @type {string}
   * @memberof ConverterBaseProps
   */
  color?: string;
  /**
   * Title of the card
   *
   * @type {string}
   * @memberof ConverterBaseProps
   */
  title?: string;
  /**
   * Component to load for settings
   *
   * @type {FC<{ errors: any; control: any }>}
   * @memberof ConverterBaseProps
   */
  settingsComponent?: FC<{ errors: any; control: any }>;
  /**
   * Default settings
   *
   * @type {Record<string, any>}
   * @memberof ConverterBaseProps
   */
  settings?: Record<string, any>;
  /**
   * Update handler on settings change
   *
   * @memberof ConverterBaseProps
   */
  onSettingsUpdate?: (settings: Record<string, any>) => void;
}
