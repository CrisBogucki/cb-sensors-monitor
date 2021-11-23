export interface SensorModel {
  epochTime: string;
  token: string;
  values: ValueModel[]
}



export interface ValueModel {
  address: string;
  tempC: string;
  tempF: string
}

