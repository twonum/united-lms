import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetPurchasedCoursesQuery } from "@/features/api/purchaseApi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import StarryBackground from "@/components/StarryBackground";

const Dashboard = () => {
  // eslint-disable-next-line no-unused-vars
  const { data, isSuccess, isError, isLoading } = useGetPurchasedCoursesQuery();

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-full">
        <h1 className="text-lg font-medium text-gray-700">Loading...</h1>
      </div>
    );

  if (isError)
    return (
      <div className="flex items-center justify-center h-full">
        <h1 className="text-lg font-medium text-red-500">
          Failed to get purchased courses
        </h1>
      </div>
    );

  const { purchasedCourse } = data || [];

  // Convert course prices to PKR
  const courseData = purchasedCourse.map((course) => ({
    name: course.courseId.courseTitle,
    //price: Math.round(course.courseId.coursePrice * conversionRate), // Converted to PKR
    price: course.courseId.coursePrice,
  }));

  // Calculate total revenue in PKR
  // const totalRevenue = purchasedCourse.reduce(
  //   (acc, element) => acc + (element.amount || 0) * conversionRate,
  //   0
  // );
  const totalRevenue = purchasedCourse.reduce(
    (acc, element) => acc + (element.amount || 0),
    0
  );
  const totalSales = purchasedCourse.length;

  return (
    <div className="relative min-h-screen">
      {/* Starry Background */}
      <StarryBackground />

      {/* Dashboard Content */}
      <div className="grid gap-8 p-6 sm:p-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 relative z-10">
        {/* Total Sales Card */}
        <Card className="bg-transparent border border-gray-600 dark:border-gray-400 shadow-xl hover:scale-105 transition-all duration-300 rounded-lg p-4">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-white">
              Total Sales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">{totalSales}</p>
          </CardContent>
        </Card>

        {/* Total Revenue Card */}
        <Card className="bg-transparent border border-gray-600 dark:border-gray-400 shadow-xl hover:scale-105 transition-all duration-300 rounded-lg p-4">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-white">
              Total Revenue (PKR)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">PKR {totalRevenue}</p>
          </CardContent>
        </Card>

        {/* Course Prices Line Chart */}
        <Card className="bg-transparent border border-gray-600 dark:border-gray-400 shadow-xl hover:scale-105 transition-all duration-300 rounded-lg p-4 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-5">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-white">
              Course Prices (PKR)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={courseData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff" />
                <XAxis
                  dataKey="name"
                  stroke="#ffffff"
                  angle={-30} // Rotated labels for better visibility
                  textAnchor="end"
                  interval={0} // Display all labels
                />
                <YAxis stroke="#ffffff" />
                <Tooltip formatter={(value, name) => [`PKR ${value}`, name]} />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#4A90E2"
                  strokeWidth={3}
                  dot={{ stroke: "#4A90E2", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
