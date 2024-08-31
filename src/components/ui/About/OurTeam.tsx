import Container from "../Container";

const OurTeam = () => {
  const teamImages = [
    "https://www.corporatephotographerslondon.com/wp-content/uploads/2016/07/approachable-professional-headshots-London.jpg",
    "https://media.licdn.com/dms/image/v2/D4D12AQFUrM6o_8m-WQ/article-inline_image-shrink_1500_2232/article-inline_image-shrink_1500_2232/0/1705940547574?e=1730332800&v=beta&t=MlNxztddf7QhaANGuvOVSM15mDGa02gH4jYTkq2CViw",
    "https://r2.erweima.ai/imgcompressed/img/compressed_b4b0fe5f13483d0500a81c915929f106.webp",
  ];

  return (
    <div className="mx-auto mt-[80px] mb-[65px] w-full">
      <Container>
        {/* Title Section */}
        <div className="flex items-center space-x-[16px] mb-[16px]">
          <div className="w-[51px] border-t-[4px] border-[#EE6611]"></div>
          <div className="text-[#EE6611] font-poppins text-[18px] font-semibold leading-[21.6px]">
            Our team
          </div>
        </div>
        <div className="text-left text-[#111827] font-inter text-[40px] font-bold leading-[48px] mb-[64px]">
          Discover the Faces Behind Our Success
        </div>

        {/* Images Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[32px]">
          {teamImages.map((src, index) => (
            <img
              key={index}
              src={src}
              alt="Team member"
              className="w-[280px] h-[350px] sm:max-w-[384px] sm:max-h-[417px] object-cover mx-auto"
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default OurTeam;
