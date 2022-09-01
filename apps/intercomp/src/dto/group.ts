export type DataGroup = {
  id: number;
  name: string;
  description: string;
  component_type_id: number;
  created_at: string;
  updated_at: string;
  pivot: {
    component_id: number;
    group_id: number;
  };
};
