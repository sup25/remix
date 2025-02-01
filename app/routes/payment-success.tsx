import { Link, useNavigate, useSearchParams } from "@remix-run/react";
import { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const encodedData = searchParams.get("data");
    const productId = localStorage.getItem("productId");
    const quanity = localStorage.getItem("quantity");

    if (encodedData) {
      try {
        const decodedString = atob(encodedData);
        const parsedData = JSON.parse(decodedString);

        console.log("Decoded Payment Data:", parsedData);

        const { transaction_uuid, total_amount, product_code } = parsedData;

        const storedTransaction = localStorage.getItem(
          "processedTransactionUuid"
        );
        if (
          transaction_uuid &&
          total_amount &&
          product_code &&
          storedTransaction !== transaction_uuid
        ) {
          fetch("/webhook-esewa", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              transactionUuid: transaction_uuid,
              totalAmount: total_amount,
              productCode: product_code,
              productId,
              quanity,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log("Webhook Response:", data);

              localStorage.setItem(
                "processedTransactionUuid",
                transaction_uuid
              );
            })
            .catch((error) => console.error("Error calling webhook:", error));
        }
      } catch (error) {
        console.error("Error decoding or parsing payment data:", error);
      }
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md text-center animate-fadeIn">
        <div className="flex justify-center">
          <FaCheckCircle className="text-green-500 text-6xl animate-bounce" />
        </div>
        <h2 className="text-2xl font-bold text-green-600 mt-4">
          Payment Successful!
        </h2>
        <p className="mt-4 text-gray-600">
          Thank you for your purchase! Your payment has been successfully
          processed.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
