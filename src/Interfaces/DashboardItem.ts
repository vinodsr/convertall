/**
 * Interface to hold the converter selected in the dashboard
 */
export interface DashboardComponent {
  /**
   * Converter ID
   *
   * @type {string}
   * @memberof DashboardComponent
   */
  converterId: string;
  /**
   * Converter Key
   *
   * @type {string}
   * @memberof DashboardComponent
   */
  converterKey: string;
  /**
   * Settings array of converter
   *
   * @type {string[]}
   * @memberof DashboardComponent
   */
  converterSettingsArr: string[];
}
