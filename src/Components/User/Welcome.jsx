import { useEffect } from "react";
import { useState } from "react";
import Button from "../Button";
import { VscDebugStart } from "react-icons/vsc";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

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
        <div className="right-side hidden sm:flex sm:justify-center sm:items-center ">
          <LazyLoadImage
            src="https://img.freepik.com/free-photo/funny-3d-illustration-cartoon-teenage-girl_183364-80384.jpg?t=st=1734286969~exp=1734290569~hmac=20bc7ff16434e3c3f625d026962420c7d7c744568d7b5e166a9eeeffe57b8c15&w=740"
            alt="welcome-img"
            effect="blur"
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomeComp;
