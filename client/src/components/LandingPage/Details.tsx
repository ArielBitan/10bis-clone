interface DetailProps {
    obj: {
      title: string;
      img: string;
      content: string;
    };
  }
  
  const Details = ({ obj }: DetailProps) => {
    return (
      <div className="flex flex-col gap-4 mb-8 mr-10">
        <div className="flex items-center ">
          <img src={obj.img} alt={obj.title} className="w-14" />
          <h1 className="text-xl text-orangePrimary">{obj.title}</h1>
        </div>
        <p className="text-md">{obj.content}</p>
      </div>
    );
  };
  
  export default Details;
  