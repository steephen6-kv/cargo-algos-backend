import { RawQueryAndParameters } from "../util/common";

export const getAllRides = (searchParams: any): RawQueryAndParameters => {
    const parameters = [
        searchParams.startPoint,
        searchParams.destinationPoint,
        searchParams.tripStartDate,
        searchParams.shipmentWeight,
        searchParams.limit,
        searchParams.offset
    ];
    const query = `
      select
        r.id as id,
        r.trip_start_date as "tripStartDate",
        u.id as "userId",
        u.name,
        u.phone_number as "phoneNumber",
        u.avatar,
        v.id as "vehicleId",
        v.type,
        v.registration_number as "registrationNumber",
        r.available_capacity as "availableCapacity",
        count(*) over() as "totalRidesCount"
      from
        public.ride r
      left join public.user u on
        u.id = r.user_id
      left join public.vehicle v on
        v.id = r.vehicle_id
      where
        r.is_deleted = false
        and v.is_deleted = false
        and u.is_deleted = false
        and u.is_driver = true
        and r.start_point = $1
        and r.destination_point = $2
        and r.trip_start_date = $3
        and r.available_capacity >= $4
      order by r.trip_start_date, u.name asc
      limit $5
      offset $6;
    `;
    return { query, parameters };
  };
