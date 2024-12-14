import { useEffect } from "react";
import { useState } from "react";
import Button from "../Button";
import { VscDebugStart } from "react-icons/vsc";
import Table from "./Table";

const WelcomeComp = () => {
  const [dateTime, setDateTime] = useState({
    time: "",
    date: "",
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-PK", {
        timeZone: "Asia/Karachi",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      const parts = formatter.formatToParts(now);
      const formattedDate = `${parts.find((p) => p.type === "day").value} ${
        parts.find((p) => p.type === "month").value
      }, ${parts.find((p) => p.type === "year").value}`;
      const formattedTime = `${parts.find((p) => p.type === "hour").value}:${
        parts.find((p) => p.type === "minute").value
      }:${parts.find((p) => p.type === "second").value}`;

      setDateTime({ date: formattedDate, time: formattedTime });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 ">
        <div className="left-side flex flex-col justify-between items-start gap-4">
          <div className="left-top flex flex-col justify-start items-start gap-4">
            <h3 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium sm:font-bold">
              Welcome!
            </h3>
            <p className="text-sm sm:text-base md:text-xl font-medium sm:font-normal">
              ✨ Hy <span className="text-red-600">M. Farooq</span> {" We're"}
              excited to have you here. Manage your products, orders, and
              customers effortlessly. {"It's"} time to take a tour. {"Let's"}
              get started!
            </p>
            <div className="tour-btn-container">
              <Button
                id="tour-btn"
                name="tour-btn"
                type="button"
                title="Start Tour"
                icon={<VscDebugStart size={20} color="white" />}
                className={
                  "border-2 border-navbarColor bg-navbarColor rounded-md px-4 py-2 font-semibold text-white text-base w-full"
                }
              />
            </div>
          </div>
          <div className="left-bottom flex flex-col justify-start items-start">
            <h3 className="text-xl lg:text-2xl xl:text-3xl font-medium sm:font-bold">
              {dateTime.date}
            </h3>
            <h3 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-normal sm:font-medium">
              {dateTime.time}
            </h3>
          </div>
        </div>
        <div className="right-side hidden sm:flex sm:justify-center sm:items-center">
          <img
            src="https://img.freepik.com/free-photo/fun-3d-cartoon-teenage-kids_183364-81180.jpg?t=st=1734149852~exp=1734153452~hmac=240490d3ea5ec1e35b4adfecb4ce8e92b51e55fac08a3b0d77723c923ba9a373&w=740"
            alt="welcome-img"
            loading="lazy"
          />
        </div>
      </div>
      <div className="order-table-container">
        <Table />
      </div>
    </div>
  );
};

export default WelcomeComp;
