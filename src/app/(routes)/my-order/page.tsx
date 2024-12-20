"use client";
import { useAuth } from "@/app/_context/AuthContext";
import { useMyOrders } from "@/app/_utils/tanstackQuery";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import dayjs from "dayjs";
import { LoaderCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { toast } from "sonner";
import MyOrderItem from "./_component/MyOrderItem";

function MyOrder() {
  const router = useRouter();
  const { user, jwt } = useAuth();
  const { data: myOrders = [], isLoading } = useMyOrders(
    user?.id ? user.id : null,
    jwt
  );
  const sortedOrders = useMemo(() => {
    return [...myOrders].sort((a, b) =>
      dayjs(b.createdAt).diff(dayjs(a.createdAt))
    );
  }, [myOrders]);

  const checkAuthentication = () => {
    const token = sessionStorage.getItem("token") || "";
    const userString = sessionStorage.getItem("user");

    if (!token || !userString) {
      toast.error("Please log in to view your orders");
      router.replace("/sign-in");
      return false;
    }

    try {
      const parsedUser = JSON.parse(userString);
      return parsedUser !== null;
    } catch (error) {
      console.error("Error parsing user data", error);
      toast.error("Authentication error. Please log in again.");
      router.replace("/sign-in");
      return false;
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-green-600 py-4 text-center">
        <h1 className="text-2xl font-bold text-white">My Orders</h1>
      </header>

      <div className="container mx-auto px-4 py-8 md:px-8 lg:px-16">
        <h2 className="text-3xl font-bold text-green-600 mb-6">
          Order History
        </h2>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <LoaderCircleIcon className="animate-spin text-green-500 h-10 w-10" />
          </div>
        ) : myOrders.length > 0 ? (
          <div className="space-y-4">
            {myOrders.map((order, index) => (
              <Collapsible key={order.id}>
                <CollapsibleTrigger asChild>
                  <div className="cursor-pointer bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="bg-slate-100 p-4 flex flex-wrap justify-between items-center hover:bg-slate-200 transition-colors">
                      <div className="flex flex-wrap gap-4 items-center">
                        <div>
                          <span className="font-semibold mr-2">
                            Order Date:
                          </span>
                          {dayjs(order.createdAt).format("YY-MMM-DD h:mm A")}
                        </div>
                        <div>
                          <span className="font-semibold mr-2">
                            Total Amount:
                          </span>
                          <span className="text-green-600">
                            Rs. {order.totalOrderAmount.toFixed(2)}
                          </span>
                        </div>
                        <div>
                          <span className="font-semibold mr-2">Status:</span>
                          <span className="text-yellow-600 font-medium">
                            {order.orderStatus}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-4 bg-white">
                    {order.orderItemList.map((item) => (
                      <MyOrderItem key={item.id} orderItem={item} />
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <p className="text-xl text-gray-500">
              You haven't placed any orders yet.
            </p>
            <Button
              onClick={() => router.push("/")}
              className="mt-4 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Start Shopping
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyOrder;
