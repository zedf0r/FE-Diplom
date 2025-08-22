type TypeTicketService = {
  have_air_conditioning: boolean;
  have_first_class: boolean;
  have_fourth_class: boolean;
  have_second_class: boolean;
  have_third_class: boolean;
  have_wifi: boolean;
  is_express: boolean;
};

type TypeTicketSeats = {
  available_seats: number;
  available_seats_info: {
    first: number;
    fourth: number;
    third: number;
  };
};

type TypeTicketPlacePrice = {
  price?: number;
  top_price?: number;
  bottom_price?: number;
  side_price?: number;
  lines_price?: number;
};

type TypeTicketPrice = {
  min_price: number;
  price_info: {
    first: TypeTicketPlacePrice;
    fourth: TypeTicketPlacePrice;
    third: TypeTicketPlacePrice;
  };
};

type TypeStation = {
  name: string;
  _id: string;
};

type TypeTicketTrain = {
  train: TypeStation;
};

type TypeTicketStation = {
  city: TypeStation;
  datetime: number;
  railway_station_name: string;
};

export type TypeTicketRoute = {
  duration: number;
  from: TypeTicketStation;
  to: TypeTicketStation;
  _id: string;
} & TypeTicketSeats &
  TypeTicketService &
  TypeTicketPrice &
  TypeTicketTrain;

export type TypeTicket = {
  departure: TypeTicketRoute;
  arrival?: TypeTicketRoute;
} & TypeTicketSeats;
