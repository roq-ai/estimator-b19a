import { EstimateInterface } from 'interfaces/estimate';
import { GetQueryInterface } from 'interfaces';

export interface TaskInterface {
  id?: string;
  name: string;
  status: string;
  estimate_id?: string;
  created_at?: any;
  updated_at?: any;

  estimate?: EstimateInterface;
  _count?: {};
}

export interface TaskGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  status?: string;
  estimate_id?: string;
}
