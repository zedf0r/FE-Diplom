export const formatDuration = (duration: number) => {
  const minutes = Math.floor((duration % 3600) / 60);
  const hours = Math.floor(duration / 3600);

  const getHourWord = () => {
    if (hours % 10 === 1 && hours % 100 !== 11) return "час";

    if (hours % 10 >= 2 && hours % 10 <= 4) return "часа";

    return "часов";
  };

  const getMinuteWord = () => {
    if (minutes % 10 === 1 && minutes % 100 !== 11) return "минута";

    if (minutes % 10 >= 2 && minutes % 10 <= 4) return "минуты";

    return "минут";
  };

  return (
    <>
      <span>
        {hours} {getHourWord()}
      </span>
      <span>
        {minutes} {getMinuteWord()}
      </span>
    </>
  );
};
