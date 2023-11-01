export interface Note {
  id?: string;
  clock_in?: string;
  clock_out?: string;
  employee_id?: string;
  client_id?: string;
  servies?: Services;
  comments?: string;
}
export interface Services {
  dressing: boolean;
  grooming: boolean;
  bathing: boolean;
  eating: boolean;
  transfers: boolean;
  mobility: boolean;
  positioning: boolean;
  toileting: boolean;
  light_housekeeping: boolean;
  laundry: boolean;
  health_related_functions: boolean;
  behavior: boolean;
  other: boolean;
}
