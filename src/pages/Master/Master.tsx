import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

const Master = () => {
  
  const tables = [
    {
      id: "regiment",
      title: "Regiment",
      description: "Manage regiment details",
      icon: "🏰",
      color: "text-red-400",
      path: "/master/regiment",
    },
    {
      id: "unit",
      title: "Unit",
      description: "Manage unit information",
      icon: "🏢",
      color: "text-blue-400",
      path: "/master/unit",
    },
    {
      id: "rank",
      title: "Rank",
      description: "Manage rank structures",
      icon: "⭐",
      color: "text-yellow-400",
      path: "/master/rank",
    },
    {
      id: "appointment",
      title: "Appointment",
      description: "Manage appointments",
      icon: "📅",
      color: "text-green-400",
      path: "/master/appointment",
    },
    {
      id: "allowance",
      title: "Allowance",
      description: "Manage allowances",
      icon: "💰",
      color: "text-indigo-400",
      path: "/master/allowance",
    },
    {
      id: "loan",
      title: "Loan",
      description: "Manage loan records",
      icon: "💳",
      color: "text-purple-400",
      path: "/master/loan",
    },
    {
      id: "fitness",
      title: "Fitness",
      description: "Manage fitness assessments",
      icon: "💪",
      color: "text-orange-400",
      path: "/master/fitness",
    },
    {
      id: "medical",
      title: "Medical",
      description: "Manage medical records",
      icon: "🏥",
      color: "text-pink-400",
      path: "/master/medical",
    },
    {
      id: "award",
      title: "Award",
      description: "Manage awards and honors",
      icon: "🏆",
      color: "text-teal-400",
      path: "/master/award",
    },
    {
      id: "mission",
      title: "Mission",
      description: "Manage mission details",
      icon: "🎯",
      color: "text-cyan-400",
      path: "/master/mission",
    },
    {
      id: "security-clearance",
      title: "Security Clearance",
      description: "Manage security clearances",
      icon: "🔒",
      color: "text-gray-400",
      path: "/master/security-clearance",
    },
  ];
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl mb-8 text-center font-bold text-gray-800">
        Master Tables
      </h1>
      <div className="max-w-6xl mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tables.map((table) => (
            <div
              key={table.id}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 hover:border-gray-300"
              onClick={() => navigate(table.path)}
            >
              <div className={`text-4xl mb-4 ${table.color}`}>{table.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {table.title}
              </h3>
              <p className="text-gray-600 text-sm">{table.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Master
