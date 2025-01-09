// Libraries Imports
import { Link } from "react-router-dom";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa6";

// Local Imports
import Play_Store from "../Assets/Images/playstore.svg";
import App_Store from "../Assets/Images/appstore.svg";

const socialMediaPlatforms = [
  {
    id: "1",
    title: "Github",
    url: "https://github.com/Farooq85-dev",
    icon: <FaGithub size={20} className="text-btnColor" />,
  },
  {
    id: "2",
    title: "Linkedin",
    url: "https://www.linkedin.com/in/muhammad-farooq-b71886295/",
    icon: <FaLinkedin size={20} className="text-btnColor" />,
  },
  {
    id: "3",
    title: "Facebook",
    url: "https://web.facebook.com/muhammadfarooqdev",
    icon: <FaFacebook size={20} className="text-btnColor" />,
  },
];

const FooterComp = () => {
  const now = new Date();
  return (
    <footer className="bg-gray-100 py-8 p-6 md:px-20">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-6 md:mb-0">
          <Link
            to="/"
            className="text-2xl font-bold text-black"
            aria-label="Brand"
          >
            Pizza Max
          </Link>
          <p className="text-sm sm:text-base mt-2 font-medium max-w-xs">
            Satisfy your cheesy cravings with the best pizza in Pakistan.
          </p>
        </div>

        <div className="text-center md:text-left mb-6 md:mb-0">
          <p className="text-sm sm:text-base">
            <span className="font-bold">Phone: </span>
            +92-123-4567890
          </p>
          <p className="text-sm sm:text-base">
            <span className="font-bold">Email: </span>info@pizzamax.com
          </p>
          <p className="text-sm sm:text-base">
            <span className="font-bold">Address: </span>
            123 Pizza Street, Arifwala, Pakistan
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end space-y-4">
          <div className="flex flex-row space-x-4">
            <img
              src={Play_Store}
              width={100}
              height={100}
              alt="play-store-link"
              loading="lazy"
              className="cursor-pointer"
            />
            <img
              src={App_Store}
              width={100}
              height={100}
              alt="app-store-link"
              loading="lazy"
              className="cursor-pointer"
            />
          </div>
          <div className="flex space-x-4">
            {socialMediaPlatforms.map((socialMediaPlatform) => (
              <Link
                aria-label={`Goto ${socialMediaPlatform?.title}`}
                className="p-2 rounded-full border border-gray-300 hover:bg-gray-200 focus:outline-none focus:bg-gray-200"
                to={socialMediaPlatform?.url}
                target="_blank"
                key={socialMediaPlatform?.id}
              >
                {socialMediaPlatform?.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center mt-6 border-t border-navbarColor pt-4">
        <p className="text-sm">
          &copy; {now.getFullYear()} Pizza Max. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default FooterComp;
