import { useEffect, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router";

const Home = () => {
  const images = [
    "src/assets/bg1.jpg",
    "src/assets/bg2.jpg",
    "src/assets/bg3.jpg",
    "src/assets/bg4.jpg",
  ];
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [images.length]);
  return (
    <div className="relative h-screen overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
            index === currentImage ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${image})`,
            filter: "brightness(30%)",
          }}
        ></div>
      ))}
      <div className="flex flex-col items-center justify-center h-full relative z-10">
        <div className="relative z-10 text-center text-white mt-20">
          <div className="p-4">
            <button
              className="px-4 py-2 bg-[#7c8b24] w-50 cursor-pointer hover:bg-[#6b7a1f]  text-white rounded"
              onClick={() => navigate("/employee")}
            >
              Employee
            </button>
          </div>
          <div className="p-4">
            <button
              className="px-4 py-2 bg-[#7c8b24] w-50 cursor-pointer hover:bg-[#6b7a1f] text-white rounded"
              onClick={() => navigate("/master")}
            >
              Master
            </button>
          </div>
          <div className="p-4">
            <button className="px-4 py-2 bg-[#7c8b24] w-50 cursor-pointer hover:bg-[#6b7a1f] text-white rounded" onClick={() => navigate("/dashboard")}>
              Dashboard
            </button>
          </div>
          <div className="p-4">
            <button className="px-4 py-2 bg-[#7c8b24] w-50 cursor-pointer hover:bg-[#6b7a1f] text-white rounded" onClick={() => navigate("/penalty")}>
              Penalty
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
