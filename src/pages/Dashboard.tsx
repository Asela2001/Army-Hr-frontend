import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

interface ExpiringItem {
  id: number;
  name: string;
  expiryDate: string;
  daysLeft: number;
}

interface PromotedEmployee {
  id: number;
  name: string;
  promotionDate: string;
}

const Dashboard = () => {
  const navigate = useNavigate();

  // Mock data - replace with actual API calls or state management (e.g., Redux, Context)
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
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);
  const [promotedEmployees, setPromotedEmployees] = useState<
    PromotedEmployee[]
  >([]);

  useEffect(() => {
    const fetchNearlyExpiringMedical = async () => {
      try {
        // Assuming a new global endpoint: GET /employee/medical-histories/all
        // This endpoint should be added to the backend controller and service to fetch all records with joins to Employee and Health for names
        const response = await axios.get<RawMedicalHistory[]>(
          "/employee/medical-histories/all"
        );
        const allMedicalHistories = response.data;

        // Current date as provided
        const today = new Date("2025-10-15");
        const thirtyDaysFromNow = new Date(
          today.getTime() + 30 * 24 * 60 * 60 * 1000
        );

        const nearlyExpiring = allMedicalHistories
          .filter((item) => item.status === "active") // Adjust filter based on your status logic (e.g., !== 'expired')
          .map((item) => {
            const expireDate = new Date(item.expire_date);
            const timeDiff = expireDate.getTime() - today.getTime();
            const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

            return {
              id: parseInt(item.mh_id, 10),
              name: `${item.employee_name || "Unknown Employee"} - ${
                item.health_name || "Medical Check"
              }`,
              expiryDate: item.expire_date,
              daysLeft: daysLeft > 0 ? daysLeft : 0, // Ensure non-negative
            };
          })
          .filter((item) => item.daysLeft > 0 && item.daysLeft <= 30)
          .sort((a, b) => a.daysLeft - b.daysLeft); // Sort by soonest expiring first

        setNearlyExpiringMedical(nearlyExpiring);
      } catch (error) {
        console.error("Error fetching nearly expiring medical data:", error);
        // Optionally set to empty array or show error state
      }
    };

    fetchNearlyExpiringMedical();

    // Simulate fetching other data - replace with real API calls similarly
    // Define "nearly expiring" as within 30 days from current date (Oct 15, 2025)
    const currentDate = new Date("2025-10-15");
    const thirtyDaysFromNow = new Date(
      currentDate.getTime() + 30 * 24 * 60 * 60 * 1000
    );

    // Mock nearly expiring security
    setNearlyExpiringSecurity([
      {
        id: 3,
        name: "Alice Johnson - Security Badge",
        expiryDate: "2025-10-18",
        daysLeft: 3,
      },
    ]);

    // Mock nearly expiring awards
    setNearlyExpiringAwards([
      {
        id: 4,
        name: "Bob Wilson - Performance Award",
        expiryDate: "2025-10-28",
        daysLeft: 13,
      },
      {
        id: 5,
        name: "Carol Davis - Innovation Award",
        expiryDate: "2025-11-02",
        daysLeft: 18,
      },
    ]);

    // Mock nearly expiring missions
    setNearlyExpiringMissions([
      {
        id: 6,
        name: "Team A - Project Mission",
        expiryDate: "2025-10-22",
        daysLeft: 7,
      },
    ]);

    // Mock gender counts
    setMaleCount(45);
    setFemaleCount(32);

    // Mock promoted employees in the last year (since Oct 15, 2024)
    setPromotedEmployees([
      { id: 7, name: "Mike Brown", promotionDate: "2025-03-10" },
      { id: 8, name: "Sarah Lee", promotionDate: "2024-12-05" },
      { id: 9, name: "Tom Garcia", promotionDate: "2025-06-20" },
    ]);
  }, []);

  const handleBackToHome = () => {
    navigate("/");
  };

  const getExpiringList = (items: ExpiringItem[]) => (
    <ul className="mt-2 space-y-1 max-h-32 overflow-y-auto">
      {items.map((item) => (
        <li
          key={item.id}
          className="text-sm text-gray-600 flex justify-between"
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
          {/* Nearly Expiring Cards */}
          <div className="bg-white rounded-lg shadow-md p-6">
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
            {getExpiringList(nearlyExpiringMedical)}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
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
            {getExpiringList(nearlyExpiringSecurity)}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
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
            {getExpiringList(nearlyExpiringAwards)}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
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
            {getExpiringList(nearlyExpiringMissions)}
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
                  {maleCount}
                </span>
              </div>
              <div className="flex justify-between items-center bg-pink-50 p-3 rounded-md">
                <span className="text-gray-700">Female</span>
                <span className="text-2xl font-bold text-pink-600">
                  {femaleCount}
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-500 text-center mt-4">
              Total: {maleCount + femaleCount}
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
