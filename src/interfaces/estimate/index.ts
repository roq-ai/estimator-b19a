import { ExpenseInterface } from 'interfaces/expense';
import { TaskInterface } from 'interfaces/task';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface EstimateInterface {
  id?: string;
  time_plan: string;
  staff_management: string;
  tasks: string;
  expenses: string;
  approval_summary: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;
  expense?: ExpenseInterface[];
  task?: TaskInterface[];
  organization?: OrganizationInterface;
  _count?: {
    expense?: number;
    task?: number;
  };
}

export interface EstimateGetQueryInterface extends GetQueryInterface {
  id?: string;
  time_plan?: string;
  staff_management?: string;
  tasks?: string;
  expenses?: string;
  approval_summary?: string;
  organization_id?: string;
}
