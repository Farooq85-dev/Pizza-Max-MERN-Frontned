import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa6";
import { Link } from "react-router-dom";

const socialMediaPlatforms = [
  {
    id: "1",
    title: "Github",
    url: "https://github.com/Farooq85-dev",
    icon: <FaGithub size={30} className="text-btnColor" />,
  },
  {
    id: "2",
    title: "Linkedin",
    url: "https://www.linkedin.com/in/muhammad-farooq-b71886295/",
    icon: <FaLinkedin size={30} className="text-btnColor" />,
  },
  {
    id: "3",
    title: "Facebook",
    url: "https://web.facebook.com/muhammadfarooqdev",
    icon: <FaFacebook size={30} className="text-btnColor" />,
  },
];

const FooterComp = () => {
  return (
    <>
      <footer className="mt-auto py-2 w-full mx-auto border-t">
        <div className="text-center">
          <div>
            <Link
              className="flex-none text-base sm:text-2xl font-semibold text-black"
              to={"/"}
              aria-label="Brand"
            >
              Pizza Max
            </Link>
          </div>

          <div className="p-2">
            <p className="text-base">
              Satisfy your cheesy cravings with the best pizza in Pakistan.
            </p>
          </div>

          <div className="space-x-4">
            {socialMediaPlatforms?.map((socialMediaPlatform) => (
              <Link
                className="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                to={socialMediaPlatform?.url}
                target="_blank"
                key={socialMediaPlatform?.id}
              >
                {socialMediaPlatform?.icon}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterComp;
