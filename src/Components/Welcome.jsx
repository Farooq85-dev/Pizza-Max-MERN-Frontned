// Libraries Imports
import { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { VscDebugStart } from "react-icons/vsc";

// Local Imports
import { useUser } from "../Context/User.context";
import Button from "./Button";

const WelcomeComp = () => {
  const [dateTime, setDateTime] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const dateTimeFormatter = new Intl.DateTimeFormat("en-PK", {
        dateStyle: "medium",
        timeStyle: "medium",
      });

      const dateTime = dateTimeFormatter.format(now);
      setDateTime(dateTime.split(","));
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
              {user && user?.role === "user" ? (
                <>
                  ✨ Hy <span className="text-red-600">{user?.name}</span>
                  {"We're"} thrilled to have you on board. Easily manage your
                  orders, favorites, and account settings all in one place.{" "}
                  {"Let's"} get started!
                </>
              ) : (
                <>
                  ✨ Hy <span className="text-red-600">{user?.name}</span>
                  {" We're"} excited to have you here. Manage products, orders,
                  and customers and much more effortlessly. {"It's"} time to
                  take a tour. {"Let's"} get started!
                </>
              )}
            </p>
            <div className="tour-btn-container">
              <Button
                id="tour-btn"
                name="tour-btn"
                type="button"
                title="Start Tour"
                icon={<VscDebugStart size={20} color="white" />}
                className="border-2 border-navbarColor bg-navbarColor rounded-md px-4 py-2 font-semibold text-white text-base w-full"
              />
            </div>
          </div>
          <div className="left-bottom flex flex-col justify-start items-start">
            {dateTime?.map((dateT, index) => (
              <h3
                key={index}
                className="text-xl lg:text-2xl xl:text-3xl font-medium sm:font-bold"
              >
                {dateT}
              </h3>
            ))}
          </div>
        </div>
        <div className="right-side hidden md:flex md:justify-center md:items-center">
          <LazyLoadImage
            width="80%"
            height="auto"
            src="https://img.freepik.com/free-photo/fun-3d-cartoon-teenage-boy_183364-81177.jpg?t=st=1736095898~exp=1736099498~hmac=81b3871e57e4e4fb5f3fdd91735ec20c47221b16e65c106fc2bc2e2d9da09cc0&w=740"
            alt="welcome-img"
            effect="blur"
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomeComp;
