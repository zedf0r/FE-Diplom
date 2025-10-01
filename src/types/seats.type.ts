export type TypeSeatsArray = {
  coach: {
    _id: string;
    name: string;
    class_type: string;
  } & TypeSeatsPrice &
    TypeSeatsService;
  seats: TypeSeatsPlaces;
}[];

export type TypeSeat = {
  coach: {
    _id: string;
    name: string;
    class_type: string;
  } & TypeSeatsPrice &
    TypeSeatsService;
  seats: TypeSeatsPlaces;
};

type TypeSeatsPrice = {
  price: number;
  top_price: number;
  bottom_price: number;
  side_price: number;
  linens_price: number;
  wifi_price: number;
};

type TypeSeatsService = {
  have_wifi: boolean;
  have_air_conditioning: boolean;
  available_seats: number;
  is_linens_included: boolean;
};

export type TypeSeatsPlaces = {
  index: number;
  available: boolean;
}[];
