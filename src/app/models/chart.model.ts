export class ChartModel {
  public xAxes: string;
  public yAxes: number;
}

export interface IChartDataResponse {
  total: number;
  results: ChartModel[];
}