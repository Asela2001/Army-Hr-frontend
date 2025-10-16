import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

interface ExpiringItem {
  id: string;
  name: string;
  expiryDate: string;
  daysLeft: number;
}

interface PromotedEmployee {
  id: string;
  name: string;
  promotionDate: string;
}

interface GenderStats {
  maleCount: number;
  femaleCount: number;
}


const Dashboard = () => {
  const navigate = useNavigate();

  const [nearlyExpiringMedical, setNearlyExpiringMedical] = useState<
    ExpiringItem[]
  >([]);
  const [nearlyExpiringSecurity, setNearlyExpiringSecurity] = useState<
    ExpiringItem[]
  >([]);
  const [nearlyExpiringAwards, setNearlyExpiringAwards] = useState<
    ExpiringItem[]
  >([]);
  const [nearlyExpiringMissions, setNearlyExpiringMissions] = useState<
    ExpiringItem[]
  >([]);
  const [genderStats, setGenderStats] = useState<GenderStats>({
    maleCount: 0,
    femaleCount: 0,
  });
  const [promotedEmployees, setPromotedEmployees] = useState<
    PromotedEmployee[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [expandedMedical, setExpandedMedical] = useState(false);
  const [expandedSecurity, setExpandedSecurity] = useState(false);
  const [expandedAwards, setExpandedAwards] = useState(false);
  const [expandedMissions, setExpandedMissions] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const baseUrl = "http://localhost:3000";

        // Fetch nearly expiring medical
        const medicalResponse = await axios.get<ExpiringItem[]>(
          `${baseUrl}/employee/dashboard/nearly-expiring-medical`
        );
        console.log("Medical Response Data:", medicalResponse.data);
        let medicalData = Array.isArray(medicalResponse.data)
          ? medicalResponse.data.sort((a, b) => a.daysLeft - b.daysLeft)
          : [];
        if (medicalData.length === 0) {
          console.log("Using sample medical data");
          medicalData = sampleMedical;
        }
        console.log("Processed Medical Data:", medicalData);
        setNearlyExpiringMedical(medicalData);

        // Fetch nearly expiring security
        const securityResponse = await axios.get<ExpiringItem[]>(
          `${baseUrl}/employee/dashboard/nearly-expiring-security`
        );
        console.log("Security Response Data:", securityResponse.data);
        let securityData = Array.isArray(securityResponse.data)
          ? securityResponse.data.sort((a, b) => a.daysLeft - b.daysLeft)
          : [];
        if (securityData.length === 0) {
          console.log("Using sample security data");
          securityData = sampleSecurity;
        }
        console.log("Processed Security Data:", securityData);
        setNearlyExpiringSecurity(securityData);

        // Fetch nearly expiring awards
        const awardsResponse = await axios.get<ExpiringItem[]>(
          `${baseUrl}/employee/dashboard/nearly-expiring-awards`
        );
        console.log("Awards Response Data:", awardsResponse.data);
        let awardsData = Array.isArray(awardsResponse.data)
          ? awardsResponse.data.sort((a, b) => a.daysLeft - b.daysLeft)
          : [];
        if (awardsData.length === 0) {
          console.log("Using sample awards data");
          awardsData = sampleAwards;
        }
        console.log("Processed Awards Data:", awardsData);
        setNearlyExpiringAwards(awardsData);

        // Fetch nearly expiring missions
        const missionsResponse = await axios.get<ExpiringItem[]>(
          `${baseUrl}/employee/dashboard/nearly-expiring-missions`
        );
        console.log("Missions Response Data:", missionsResponse.data);
        let missionsData = Array.isArray(missionsResponse.data)
          ? missionsResponse.data.sort((a, b) => a.daysLeft - b.daysLeft)
          : [];
        if (missionsData.length === 0) {
          console.log("Using sample missions data");
          missionsData = sampleMissions;
        }
        console.log("Processed Missions Data:", missionsData);
        setNearlyExpiringMissions(missionsData);

        // Fetch gender stats
        const genderResponse = await axios.get<GenderStats>(
          `${baseUrl}/employee/dashboard/gender-stats`
        );
        console.log("Gender Response Data:", genderResponse.data);
        let genderData = genderResponse.data;
        let processedGenderStats = {
          maleCount: (genderData as any)?.maleCount ?? 0,
          femaleCount: (genderData as any)?.femaleCount ?? 0,
        };
        if (
          processedGenderStats.maleCount === 0 &&
          processedGenderStats.femaleCount === 0
        ) {
          console.log("Using sample gender stats");
          processedGenderStats = sampleGenderStats;
        }
        console.log("Processed Gender Stats:", processedGenderStats);
        setGenderStats(processedGenderStats);

        // Fetch promoted employees
        const promotionsResponse = await axios.get<PromotedEmployee[]>(
          `${baseUrl}/employee/dashboard/promotions-last-year`
        );
        console.log("Promotions Response Data:", promotionsResponse.data);
        let promotionsData = Array.isArray(promotionsResponse.data)
          ? promotionsResponse.data
          : [];
        if (promotionsData.length === 0) {
          console.log("Using sample promotions data");
          promotionsData = samplePromotions;
        }
        console.log("Processed Promotions Data:", promotionsData);
        setPromotedEmployees(promotionsData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        // Fallback to sample data on error
        console.log("Using sample data due to error");
        setNearlyExpiringMedical(sampleMedical);
        setNearlyExpiringSecurity(sampleSecurity);
        setNearlyExpiringAwards(sampleAwards);
        setNearlyExpiringMissions(sampleMissions);
        setGenderStats(sampleGenderStats);
        setPromotedEmployees(samplePromotions);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleBackToHome = () => {
    navigate("/");
  };

  const toggleExpanded = (
    setter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setter((prev) => !prev);
  };

  const getExpiringList = (items: ExpiringItem[]) => (
    <ul className="mt-2 space-y-1 max-h-32 overflow-y-auto">
      {items.map((item) => (
        <li
          key={item.id}
          className={`text-sm text-gray-600 flex justify-between p-2 rounded ${
            item.daysLeft < 10 ? "bg-red-50" : ""
          }`}
        >
          <span className="truncate">{item.name}</span>
          <span
            className={`font-semibold ${
              item.daysLeft <= 7 ? "text-red-600" : "text-orange-600"
            }`}
          >
            {item.daysLeft} days
          </span>
        </li>
      ))}
      {items.length === 0 && (
        <li className="text-sm text-gray-500 italic">No items expiring soon</li>
      )}
    </ul>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading Dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">HR Dashboard</h1>
          <button
            onClick={handleBackToHome}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
          >
            Back to Home
          </button>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {/* Nearly Expiring Medical Card */}
          <div className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow">
            <div
              className="flex items-center justify-between"
              onClick={() => toggleExpanded(setExpandedMedical)}
            >
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-full">
                  <svg
                    className="w-6 h-6 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">
                    Nearly Expiring Medical
                  </h3>
                  <p className="text-2xl font-bold text-gray-900">
                    {nearlyExpiringMedical.length}
                  </p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <svg
                  className={`w-5 h-5 transform transition-transform ${
                    expandedMedical ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
            {expandedMedical && getExpiringList(nearlyExpiringMedical)}
          </div>

          {/* Nearly Expiring Security Card */}
          <div className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow">
            <div
              className="flex items-center justify-between"
              onClick={() => toggleExpanded(setExpandedSecurity)}
            >
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-full">
                  <svg
                    className="w-6 h-6 text-yellow-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">
                    Nearly Expiring Security
                  </h3>
                  <p className="text-2xl font-bold text-gray-900">
                    {nearlyExpiringSecurity.length}
                  </p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <svg
                  className={`w-5 h-5 transform transition-transform ${
                    expandedSecurity ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
            {expandedSecurity && getExpiringList(nearlyExpiringSecurity)}
          </div>

          {/* Nearly Expiring Awards Card */}
          <div className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow">
            <div
              className="flex items-center justify-between"
              onClick={() => toggleExpanded(setExpandedAwards)}
            >
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-full">
                  <svg
                    className="w-6 h-6 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">
                    Nearly Expiring Awards
                  </h3>
                  <p className="text-2xl font-bold text-gray-900">
                    {nearlyExpiringAwards.length}
                  </p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <svg
                  className={`w-5 h-5 transform transition-transform ${
                    expandedAwards ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
            {expandedAwards && getExpiringList(nearlyExpiringAwards)}
          </div>

          {/* Nearly Expiring Missions Card */}
          <div className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow">
            <div
              className="flex items-center justify-between"
              onClick={() => toggleExpanded(setExpandedMissions)}
            >
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-full">
                  <svg
                    className="w-6 h-6 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">
                    Nearly Expiring Missions
                  </h3>
                  <p className="text-2xl font-bold text-gray-900">
                    {nearlyExpiringMissions.length}
                  </p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <svg
                  className={`w-5 h-5 transform transition-transform ${
                    expandedMissions ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
            {expandedMissions && getExpiringList(nearlyExpiringMissions)}
          </div>

          {/* Gender Counts Card */}
          <div className="md:col-span-2 lg:col-span-1 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
              Employee Gender Distribution
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-blue-50 p-3 rounded-md">
                <span className="text-gray-700">Male</span>
                <span className="text-2xl font-bold text-blue-600">
                  {genderStats.maleCount}
                </span>
              </div>
              <div className="flex justify-between items-center bg-pink-50 p-3 rounded-md">
                <span className="text-gray-700">Female</span>
                <span className="text-2xl font-bold text-pink-600">
                  {genderStats.femaleCount}
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-500 text-center mt-4">
              Total: {genderStats.maleCount + genderStats.femaleCount}
            </p>
          </div>

          {/* Promoted Employees Card */}
          <div className="md:col-span-2 lg:col-span-3 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Promoted Employees (Last Year)
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Promotion Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {promotedEmployees.map((emp) => (
                    <tr key={emp.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {emp.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {emp.promotionDate}
                      </td>
                    </tr>
                  ))}
                  {promotedEmployees.length === 0 && (
                    <tr>
                      <td
                        colSpan={2}
                        className="px-6 py-4 text-center text-sm text-gray-500"
                      >
                        No promotions in the last year
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
