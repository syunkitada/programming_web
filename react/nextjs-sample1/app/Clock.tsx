import React from "react";

export function Clock() {
  const [date, setDate] = React.useState(new Date());
  const [useHour12, setUseHour12] = React.useState(true);

  const formatter = new Intl.DateTimeFormat("ja-JP", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: useHour12,
  });
  const time = formatter.format(date);

  React.useEffect(() => {
    //setup
    const timerId = setTimeout(() => {
      console.log("setTimeout");
      setDate(new Date());
    }, 5000);

    return () => {
      console.log("cleanup");
      //cleanup
      clearTimeout(timerId);
    };
  }, [date, useHour12]);

  const switchTime = () => {
    console.log("DEBUG switchTime");
    setUseHour12(!useHour12);
  };

  return (
    <div>
      <div>
        <span>{time}</span>
      </div>
      <button onClick={switchTime}>Switch time</button>
    </div>
  );
}
