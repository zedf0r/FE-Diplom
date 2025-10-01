import dayjs from "dayjs";

export const formatDuration = (duration: number) => {
  const date = dayjs().startOf("day").add(duration, "second");
  const minutes = date.minute();
  const hours = date.hour();

  const getHourWord = (hours: number) => {
    if (hours % 10 === 1 && hours % 100 !== 11) return "час";

    if (hours % 10 >= 2 && hours % 10 <= 4) return "часа";

    return "часов";
  };

  const getMinuteWord = (minutes: number) => {
    if (minutes % 10 === 1 && minutes % 100 !== 11) return "минута";

    if (minutes % 10 >= 2 && minutes % 10 <= 4) return "минуты";

    return "минут";
  };

  return (
    <>
      <span>
        {hours} {getHourWord(hours)}
      </span>
      <span>
        {minutes} {getMinuteWord(minutes)}
      </span>
    </>
  );
};
