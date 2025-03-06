const ComingSoonPage = () => {
  return (
    <div className="">
      <div className="container">
        <div className="flex justify-between flex-wrap items-center min-h-screen pl-8">
          <div className="max-w-[500px] space-y-4 text-white">
            <div className="relative flex space-x-3 items-center text-2xl">
              <span className="inline-block w-[25px] bg-white h-[2px]"></span>
              <span>Coming soon</span>
            </div>
            <div className="xl:text-[70px] xl:leading-[70px] text-4xl font-semibold">
              Under Developement
            </div>
            {/* <p className="font-normal text-slate-600 dark:text-slate-300 max-w-[400px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt.
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;
