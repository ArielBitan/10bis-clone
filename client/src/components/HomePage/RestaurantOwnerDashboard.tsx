const RestaurantOwnerDashboard = () => {
    
      if (isLoading) return <div>Loading ...</div>;
      if (isError) return <div>Error loading </div>;
      if (!data) return <div>No data available</div>;
    
  return (
    <div>
      <div className="relative ">
        <img
          src={data.background_image}
          alt="background_image"
          className="object-cover w-full h-auto"
        />
        <div
          className="absolute top-0 left-0 w-full h-full bg-white"
          style={{
            clipPath: "polygon(0 85%, 100% 65%, 100% 100%, 0 100%)",
          }}
        ></div>
        <div className="absolute inset-0 items-center justify-center hidden top-2/3 md:flex">
          <img
            src={data.image}
            alt="logo"
            className="object-cover border-4 rounded-full w-36 h-36 border-slate-100"
          />
        </div>
      </div>
      <div className="px-4 ">
        <div className="mb-2"></div>
        <div className="flex gap-1 text-sm datas-center ">
          <div className="flex gap-1 datas-center">
            <FaStar className="mb-1 text-yellow-500" />
            <span>0</span>
          </div>
          <span>•</span>
          <span>{`משלוח ₪${data.delivery_fee || 0}`}</span>
          <span>•</span>
          <span>
            {data.delivery_time
              ? data.delivery_time.split("כ-").slice(1, 2).join(" - ")
              : ""}
          </span>{" "}
          <span>•</span>
          <div className="mb-2 text-sm">
            <span>{`מינימום הזמנה  ₪${data.min_order || 0}`}</span>
          </div>
        </div>
        {data.description && (
          <div className="m-3 font-bold ">{`*${data.description}`}</div>
        )}
        <InfoRestaurant item={data} />
        <div className="flex items-center mt-4">
          <div className="border  bg-gray-100 flex items-center gap-2 px-2 w-[95%] h-12  border-gray-300 hover:border-gray-500 rounded-3xl">
            <FiSearch className="hover:cursor-pointer text-backgroundOrange " />
            <Input
              type="text"
              placeholder={`חיפוש ב${data.name}`}
              className="h-4 text-sm bg-gray-100 border-none "
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default RestaurantOwnerDashboard;
