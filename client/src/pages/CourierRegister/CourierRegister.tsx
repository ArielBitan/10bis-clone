const courierRegister=()=>{
    return(
        <div className="overflow-x-hidden">
        {/* 1stimg */}
        <div
          className="relative min-h-screen bg-fixed bg-center bg-cover"
          style={{
            backgroundImage:
              "url(https://www.10bis.co.il/Areas/G12/Content/Images/HomePage/HomePage_MainImage.jpg)",
          }}
        >
          <div className="absolute inset-0">
            <div className="absolute transform -translate-x-10 -translate-y-10 top-20 right-[10%]">
              <img
                src="https://www.10bis.co.il/Areas/G12/Content/Images/Layout/Logo_Orange.svg"
                alt=""
              />
            </div>
  
            <div className="absolute transform z-30 -translate-x-10 -translate-y-10 top-20 left-[10%]">
              <LogInModal rolee="login" />
            </div>
  
            <div className="relative z-10 flex items-center justify-center min-h-screen">
              <div className="w-full">
                <FirstContent />
              </div>
            </div>
          </div>
        </div>
      )
}
export default courierRegister