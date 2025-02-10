import { Link, useSearchParams } from "@remix-run/react";
import { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useCart } from "~/hooks/useCart";
import { useUser } from "~/hooks/useUser";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();
  const { user } = useUser();

  useEffect(() => {
    if (!user?.id) return;
    const encodedData = searchParams.get("data");
    const productId = localStorage.getItem("productId");
    const quantity = localStorage.getItem("quantity");
    const checkoutSource = localStorage.getItem("checkoutSource");
    const cartProductsString =
      checkoutSource === "drawer"
        ? localStorage.getItem("shopping-cart")
        : null;

    const cartProducts = cartProductsString
      ? JSON.parse(cartProductsString)
      : [];

    const formattedCart = Array.isArray(cartProducts)
      ? cartProducts.map((item) => ({
          quantity: item.quantity,
          productId: item.product.id,
        }))
      : [];

    if (encodedData) {
      try {
        const decodedString = atob(encodedData);
        const parsedData = JSON.parse(decodedString);
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
              productId: checkoutSource === "drawer" ? null : productId,
              quantity: checkoutSource === "drawer" ? null : quantity,
              formattedCart,
              userId: user.id,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              localStorage.setItem(
                "processedTransactionUuid",
                transaction_uuid
              );
              if (checkoutSource === "drawer") {
                localStorage.removeItem("shopping-cart");
                clearCart();
              }
              localStorage.removeItem("checkoutSource");
            })

            .catch((error) => console.error("Error calling webhook:", error));
        }
      } catch (error) {
        console.error("Error decoding or parsing payment data:", error);
      }
    }
  }, [searchParams, user]);

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
