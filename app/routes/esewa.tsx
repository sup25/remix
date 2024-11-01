import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import CryptoJS from "crypto-js";

export const loader: LoaderFunction = async () => {
  return json({});
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const totalAmount = formData.get("total_amount");
  const transactionUuid = formData.get("transaction_uuid");
  const productCode = formData.get("product_code");
  const secret = formData.get("secret");

  console.log("Received form data:", {
    totalAmount,
    transactionUuid,
    productCode,
  });

  if (
    typeof totalAmount !== "string" ||
    typeof transactionUuid !== "string" ||
    typeof productCode !== "string" ||
    typeof secret !== "string"
  ) {
    return json({ error: "Invalid form data" }, { status: 400 });
  }

  try {
    const dataString = `total_amount=${totalAmount},transaction_uuid=${transactionUuid},product_code=${productCode}`;
    console.log("Data string:", dataString);

    const hash = CryptoJS.HmacSHA256(dataString, secret);
    const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);

    console.log("Generated signature:", hashInBase64);

    return json({
      signature: hashInBase64,
      debug: {
        dataString,
        inputValues: {
          totalAmount,
          transactionUuid,
          productCode,
        },
      },
    });
  } catch (error) {
    console.error("Error generating signature:", error);
    return json({ error: "Signature generation failed" }, { status: 500 });
  }
};

export default function Page() {
  return null;
}
