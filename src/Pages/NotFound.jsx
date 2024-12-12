import Result from "../Components/Result";

const NotFoundPage = () => {
  return (
    <div className="mt-20 p-4 sm:px-10">
      <Result
        text="Sorry, the page you visited does not exist."
        btnText="Goto Home"
        url="/"
        className={
          "border-2 border-navbarColor bg-navbarColor rounded-md px-4 py-2 font-semibold text-white text-base"
        }
        isBtn={true}
        status={404}
      />
    </div>
  );
};

export default NotFoundPage;
