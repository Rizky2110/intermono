import { ComponentType } from "./component";

type Output = {
  day: number;
  start_hour: number;
  end_hour: number;
};

export type DataSchedule = {
  id: number;
  creator_id: number;
  name: string;
  active: number;
  component_type_id: number;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  identity: string;
  start_date: string;
  end_date: string;
  data: {
    start_date: string;
    end_date: string;
    schedules: {
      output_1: Output[];
      output_2: Output[];
      output_3: Output[];
    };
  };
  component_type: ComponentType;
  component_ids: number[];
  component: any[];
};
