import { EstimateInterface } from 'interfaces/estimate';
import { GetQueryInterface } from 'interfaces';

export interface ExpenseInterface {
  id?: string;
  description: string;
  amount: number;
  estimate_id?: string;
  created_at?: any;
  updated_at?: any;

  estimate?: EstimateInterface;
  _count?: {};
}

export interface ExpenseGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  estimate_id?: string;
}
