"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchData } from "@/lib/FetchData/page";
import LoadingPage from "@/app/component/loading/page";
export default function CommandeStats({ Display, onClose }) {
  const [totalOrders, setTotalOrders] = useState(0);
  const [loading, setLoading] = useState(false);
  const [ordersByProduct, setOrdersByProduct] = useState([]);
  const [ordersByRegion, setOrdersByRegion] = useState([]);

  const fetchStats = async () => {
    const data = await fetchData({ method: "GET", url: "/api/Commande/stats" });
    setTotalOrders(data.totalCommandes);
    setOrdersByProduct(data.commandesWithTitles);
    setOrdersByRegion(data.commandesByCountry);
  };

  useEffect(() => {
    setLoading(true);
    fetchStats().finally(() => setLoading(false));
  }, []);

  if (!Display) return null;

  return (
    <>
      {loading && <LoadingPage isVisible={true} />}
      <div className="fixed inset-0 z-50 flex justify-center items-start sm:items-center md:items-center backdrop-blur-md bg-black/30 px-2 sm:px-4 overflow-y-auto">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white scale-90 rounded-2xl shadow-xl w-full max-w-6xl p-4 sm:p-6 md:p-6 relative"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Modal Title */}
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-800">
            Order Statistics
          </h2>

          {/* Total Orders */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="rounded-2xl shadow-md mb-6">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-700">
                  Total Orders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-5xl font-bold text-blue-600 text-center">
                  {totalOrders}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Orders by Product */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="rounded-2xl shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-700">
                    Orders by Product
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="w-full h-[250px] sm:h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={ordersByProduct}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="title" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Bar
                          dataKey="count"
                          fill="#3b82f6"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Orders by Region */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="rounded-2xl shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-700">
                    Orders by Region
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="w-full h-[300px] sm:h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={ordersByRegion}
                          dataKey="_count"
                          nameKey="region"
                          cx="50%"
                          cy="50%"
                          outerRadius="80%"
                          innerRadius="45%"
                          fill="#3b82f6"
                          label={({ name, value }) => `${name}: ${value}`}
                        />
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
