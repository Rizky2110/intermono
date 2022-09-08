import {
  BaseServerSuccessPagination,
  DefaultRequest,
  ServerResponse,
} from "src/lib/constants";
import {
  ComponentType,
  DataComponentBreaker,
  LastData,
  LastRootData,
} from "./component";

type Query = {
  page?: number;
  page_size?: number;
  filter_search?: string;
};

export type DataGroup = {
  id: number;
  name: string;
  description: string | null;
  component_type_id: number;
  created_at: string;
  updated_at: string;
  pivot: {
    component_id: number;
    group_id: number;
  };
};

type ComponentIds = {
  component_id: number;
  last_root_data: LastRootData;
  last_data: LastData;
  config_data: string | null;
  pivot: {
    group_id: number;
    component_id: number;
  };
};

type Data = Omit<DataGroup, "pivot"> & {
  component_id: number[];
  component_type: ComponentType;
  component_ids: ComponentIds[];
  components: DataComponentBreaker[];
};

export type Groups = ServerResponse<
  BaseServerSuccessPagination & {
    data: Data[];
  }
>;

export type Group = ServerResponse<Data>;
export type GroupDeleteOne = ServerResponse<boolean> & {
  groupId: number;
};

export type RequestGroups = DefaultRequest<Query, string>;
export type RequestGroupsOne = DefaultRequest<{ id: string }, string>;
export type RequestGroupsDeleteOne = RequestGroupsOne;
export type RequestGroupsCreate = DefaultRequest<
  {
    name: string;
    component_type_id: number;
    component_ids: number[];
  },
  string
>;
