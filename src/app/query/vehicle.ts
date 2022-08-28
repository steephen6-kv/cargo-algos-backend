import { RawQueryAndParameters } from "../util/common";

export const getVehicleTypes = (limit: number, offset: number): RawQueryAndParameters => {
    const parameters = [limit, offset];
    const query = `
      select
        distinct v.type
      from
        public.vehicle v
      where
        v.is_deleted = false
        and v.type is not null
      limit $1
      offset $2;
    `;
    return { query, parameters };
  };
