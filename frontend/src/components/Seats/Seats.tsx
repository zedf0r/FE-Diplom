import classNames from "classnames";
import type { TypeSeat, TypeSeatsPlaces } from "../../types";
import style from "./Seats.module.css";
import { useAppDispatch, useAppSelector } from "../../services/store";
import {
  toggleSeat,
  type TypeSelectedPlace,
} from "../../services/seats/seatsSlice";

export const Seats = ({
  places,
  route,
}: {
  places: TypeSeat;
  route: "departure" | "arrival";
}) => {
  const { selectedPlace } = useAppSelector((state) => state.seats);
  const dispatch = useAppDispatch();

  const handleOnClick = (index: number, places: TypeSeat) => {
    if (
      index % 2 === 0 &&
      (places.coach.class_type === "third" ||
        places.coach.class_type === "second")
    ) {
      dispatch(
        toggleSeat({
          seat: {
            _id: places.coach._id,
            index: index,
            class_type: places.coach.class_type,
            price: places.coach.top_price,
          },
          route: route,
        })
      );
    } else if (
      index % 2 === 1 &&
      (places.coach.class_type === "third" ||
        places.coach.class_type === "second")
    ) {
      dispatch(
        toggleSeat({
          seat: {
            _id: places.coach._id,
            index: index,
            class_type: places.coach.class_type,
            price: places.coach.bottom_price,
          },
          route: route,
        })
      );
    }
    if (places.coach.class_type === "first") {
      dispatch(
        toggleSeat({
          seat: {
            _id: places.coach._id,
            index: index,
            class_type: places.coach.class_type,
            price: places.coach.price,
          },
          route: route,
        })
      );
    }

    if (places.coach.class_type === "fourth") {
      dispatch(
        toggleSeat({
          seat: {
            _id: places.coach._id,
            index: index,
            class_type: places.coach.class_type,
            price: places.coach.bottom_price,
          },
          route: route,
        })
      );
    }
  };

  const showPlaces = (
    seats: TypeSeatsPlaces,
    chunkSize: number,
    sidewall?: boolean,
    luxe?: boolean
  ) => {
    const groups = Math.ceil(seats.length / chunkSize);
    const totalPlaces = Array.from({ length: groups }, (_, groupIndex) =>
      seats.slice(groupIndex * chunkSize, groupIndex * chunkSize + chunkSize)
    );

    return totalPlaces.map((item, i) => (
      <div
        key={i}
        className={classNames(style.place__big_room, {
          [style.place__big_room_luxe]: luxe,
        })}
      >
        <div
          className={classNames(
            style.big_room__seat,
            {
              [style.big_room__seat_sidewall]: sidewall,
            },
            { [style.big_room__seat_luxe]: luxe }
          )}
        >
          <Place
            item={item}
            startIndex={0}
            onClick={() => handleOnClick(item[0].index, places)}
            place={places}
            selectedPlace={selectedPlace[`${route}Place`]}
          />
          <Place
            item={item}
            startIndex={1}
            onClick={() => handleOnClick(item[1].index, places)}
            place={places}
            selectedPlace={selectedPlace[`${route}Place`]}
          />
        </div>
        {chunkSize == 2 ? null : (
          <div className={style.big_room__seat}>
            <Place
              item={item}
              startIndex={2}
              onClick={() => handleOnClick(item[2].index, places)}
              place={places}
              selectedPlace={selectedPlace[`${route}Place`]}
            />
            <Place
              item={item}
              startIndex={3}
              onClick={() => handleOnClick(item[3].index, places)}
              place={places}
              selectedPlace={selectedPlace[`${route}Place`]}
            />
          </div>
        )}
      </div>
    ));
  };

  const coupeSeats = places.seats.filter((_, i) => i < 32);
  const sidewallSeats = places.seats.filter((_, i) => i >= 32);

  return (
    <div className={style.seats}>
      <div className={style.seats__place}>
        {places.coach.class_type === "first"
          ? showPlaces(coupeSeats, 2, false, true)
          : showPlaces(coupeSeats, 4)}
      </div>
      <div className={style.seats__place}>
        {places.coach.class_type === "fourth"
          ? showPlaces(sidewallSeats, 4)
          : showPlaces(sidewallSeats, 2, true)}
      </div>
    </div>
  );
};

const Place = ({
  item,
  startIndex,
  place,
  selectedPlace,
  onClick,
}: {
  item: TypeSeatsPlaces;
  startIndex: number;
  place: TypeSeat;
  selectedPlace: TypeSelectedPlace[];
  onClick: () => void;
}) => {
  if (!item[startIndex]) return null;

  const isSelected = selectedPlace.some(
    (seat) =>
      seat.index === item[startIndex].index && seat._id === place.coach._id
  );
  return (
    item[startIndex] && (
      <p
        className={classNames({
          [style.seat__close]: item[startIndex].available === false,
          [style.seat__selected]: isSelected,
        })}
        onClick={onClick}
      >
        {item[startIndex].index}
      </p>
    )
  );
};
