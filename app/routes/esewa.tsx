import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import CryptoJS from "crypto-js";

interface CartItem {
  product: {
    id: number;
    title: string;
    brand: string;
    slug: string;
    price: number;
    stock: number;
    images: string[];
    discountTag: string | null;
    categories: string[];
    createdAt: string;
    updatedAt: string;
  };
  quantity: number;
}
export const loader: LoaderFunction = async () => {
  return json({});
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  console.log("form data", formData);

  const totalAmount = formData.get("total_amount");
  const transactionUuid = formData.get("transaction_uuid");
  const productCode = formData.get("product_code");
  const secret = formData.get("secret");
  const cartData = formData.get("cart_data");

  if (
    typeof totalAmount !== "string" ||
    typeof transactionUuid !== "string" ||
    typeof productCode !== "string" ||
    typeof secret !== "string"
  ) {
    return json({ error: "Invalid form data" }, { status: 400 });
  }

  // Define types for cart items

  let cartItems: CartItem[] = [];

  // Parse cart data if it exists
  if (cartData && typeof cartData === "string") {
    try {
      cartItems = JSON.parse(cartData) as CartItem[];
    } catch (error) {
      return json({ error: "Invalid cart data format" }, { status: 400 });
    }
  }

  try {
    const dataString = `total_amount=${totalAmount},transaction_uuid=${transactionUuid},product_code=${productCode}`;
    const hash = CryptoJS.HmacSHA256(dataString, secret);
    const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);

    const response = {
      signature: hashInBase64,
      debug: {
        dataString,
        inputValues: {
          totalAmount,
          transactionUuid,
          productCode,
        },
        cartItems: cartItems.map((item: CartItem) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
      },
    };

    console.log("Processed eSewa Data:", response.debug.cartItems);

    return json(response);
  } catch (error) {
    console.error("Signature generation failed", error);
    return json({ error: "Signature generation failed" }, { status: 500 });
  }
};

export default function Page() {
  return null;
}
