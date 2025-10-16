import { useEffect, useState } from "react";
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

  const modules = [
    {
      id: "employee",
      title: "Employee",
      description: "Manage employee records and information",
      icon: "👤",
      color: "text-blue-400",
      path: "/employee",
    },
    {
      id: "master",
      title: "Master",
      description: "Configure master data and settings",
      icon: "⚙️",
      color: "text-green-400",
      path: "/master",
    },
    {
      id: "dashboard",
      title: "Dashboard",
      description: "View analytics and insights",
      icon: "📊",
      color: "text-purple-400",
      path: "/dashboard",
    },
    {
      id: "penalty",
      title: "Penalty",
      description: "Track and manage penalties",
      icon: "⚠️",
      color: "text-orange-400",
      path: "/penalty",
    },
  ];

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
      <div className="flex flex-col items-center justify-center h-full relative z-10 px-4">
        <h1 className="text-2xl font-bold text-white mb-8 text-center">
          Select a module to get started
        </h1>
        <div className="grid grid-cols-2 gap-6 max-w-4xl w-full">
          {modules.map((module) => (
            <div
              key={module.id}
              className="bg-black/20 backdrop-blur-sm rounded-xl p-6 text-white border border-white/20 hover:bg-black/30 transition-all duration-300 cursor-pointer shadow-lg"
              onClick={() => navigate(module.path)}
            >
              <div className={`text-4xl mb-4 ${module.color}`}>
                {module.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{module.title}</h3>
              <p className="text-gray-300 text-sm">{module.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
