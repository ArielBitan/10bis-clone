const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div
        style={{
          width: '50%',  
          height: '50%', 
          background: 'url(https://www.yallatavi.co.il/wp-content/uploads/2023/03/%D7%A7%D7%95%D7%A4%D7%95%D7%A0%D7%99%D7%9D-%D7%A9%D7%9C-%D7%AA%D7%9F-%D7%91%D7%99%D7%A1.webp) center no-repeat',
          backgroundSize: 'contain',
          animation: 'pulse 1.5s infinite',
          filter: 'grayscale(100%)',  
          opacity: 0.3,   
        }}
      ></div>
      <style>
        {`
          @keyframes pulse {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.1);
            }
            100% {
              transform: scale(1);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Loading;
