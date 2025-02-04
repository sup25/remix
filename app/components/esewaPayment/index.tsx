import { useEffect, useState, FormEvent } from "react";
import { useFetcher } from "@remix-run/react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IProduct } from "../schema/Proudct.schema";
interface FetcherData {
  signature?: string;
  error?: string;
  debug?: {
    dataString: string;
    inputValues: {
      totalAmount: string;
      transactionUuid: string;
      productCode: string;
    };
  };
}

interface EsewaPaymentProps {
  amount: number;
  product: IProduct;
  productCode?: string;
  quantity: number;
}

export default function EsewaPayment({
  amount,
  productCode = "EPAYTEST",
  product,
  quantity,
}: EsewaPaymentProps) {
  const fetcher = useFetcher<FetcherData>();
  const [transactionUUID, setTransactionUUID] = useState<string>("");
  const [signature, setSignature] = useState<string>("");
  const [baseUrl, setBaseUrl] = useState<string>("");
  const [isSignatureReady, setIsSignatureReady] = useState(false);

  const taxAmount = Math.round(amount * 0); // 13% VAT
  const totalAmount = amount + taxAmount;

  useEffect(() => {
    setBaseUrl(window.location.origin);
  }, []);

  const generateNewTransactionUUID = () => {
    const uniqueUUID = uuidv4();
    setTransactionUUID(uniqueUUID);
    return uniqueUUID;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (totalAmount === 0) {
      toast.error("Please select quantity to proceed with payment");
      return;
    }

    try {
      /* const stockformData = new FormData();
      stockformData.append("productId", product.id.toString());
      stockformData.append("quantity", quantity.toString());

      const response = await fetch("/reserve-stock", {
        method: "POST",
        body: stockformData,
      }); */

      /* if (!response.ok) {
        const errorText = await response.text();
        console.error("Server Error Response:", errorText);
        throw new Error("Failed to reserve stock");
      } */

      /* const data = await response.json(); */
      /*  console.log(data);

      if (!data.success) {
        toast.error(data.error || "Stock reservation failed.");
        return;
      } */

      // Proceed with eSewa payment if stock is reserved
      const newTransactionUUID = generateNewTransactionUUID();
      localStorage.setItem("productId", product.id.toString());

      // Explicitly cast to HTMLFormElement
      const formElement = event.target as HTMLFormElement;
      const formData = new FormData(formElement);
      console.log(formData);
      formData.set("transaction_uuid", newTransactionUUID);

      setSignature("");
      setIsSignatureReady(false);

      fetcher.submit(formData, { method: "post", action: "/esewa" });
    } catch (error) {
      console.log(error);
      toast.error("Error reserving stock. Please try again.");
    }
  };

  useEffect(() => {
    if (fetcher.data?.signature) {
      console.log("Received Signature:", fetcher.data.signature);
      console.log("Debug Info:", fetcher.data.debug);
      setSignature(fetcher.data.signature);
      setIsSignatureReady(true);
    } else if (fetcher.data?.error) {
      console.error("Signature generation failed:", fetcher.data.error);
    }
  }, [fetcher.data]);

  useEffect(() => {
    if (isSignatureReady) {
      const esewaForm = document.getElementById("esewaForm") as HTMLFormElement;
      if (esewaForm) {
        const formData = new FormData(esewaForm);
        console.log("eSewa Form Data:", Object.fromEntries(formData.entries()));
        esewaForm.submit();
      }
      setIsSignatureReady(false);
    }
  }, [isSignatureReady]);

  if (!baseUrl) {
    return null;
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} method="post" className="space-y-4">
        <input type="hidden" name="transaction_uuid" value={transactionUUID} />
        <input type="hidden" name="amount" value={amount.toString()} />
        <input
          type="hidden"
          name="total_amount"
          value={totalAmount.toString()}
        />

        <input type="hidden" name="tax_amount" value={taxAmount.toString()} />
        <input type="hidden" name="product_code" value={productCode} />
        <input type="hidden" name="product_service_charge" value="0" />
        <input type="hidden" name="product_delivery_charge" value="0" />
        <input
          type="hidden"
          name="success_url"
          value={`${baseUrl}/payment-success`}
        />
        <input
          type="hidden"
          name="failure_url"
          value={`${baseUrl}/payment-failure`}
        />
        <input
          type="hidden"
          name="signed_field_names"
          value="total_amount,transaction_uuid,product_code"
        />
        <input type="hidden" name="secret" value="8gBm/:&EnhH.1/q" />
        <button
          type="submit"
          className="w-full cursor-pointer flex flex-col items-center border border-green-200 hover:border-green-300 transition-colors bg-green-50 text-black py-2 px-4 rounded-lg"
        >
          <img
            src="/esewa.svg"
            alt="Esewa"
            className="mr-2 w-[150px] h-auto text-white"
          />
          <span className="text-black my-2 font-bold">
            (रु {totalAmount.toLocaleString("en-NP")})
          </span>
        </button>
      </form>

      <form
        id="esewaForm"
        action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
        method="POST"
        target="_blank"
      >
        <input type="hidden" name="amount" value={amount.toString()} />
        <input type="hidden" name="tax_amount" value={taxAmount.toString()} />
        <input
          type="hidden"
          name="total_amount"
          value={totalAmount.toString()}
        />
        <input type="hidden" name="transaction_uuid" value={transactionUUID} />
        <input type="hidden" name="product_code" value={productCode} />
        <input type="hidden" name="product_service_charge" value="0" />
        <input type="hidden" name="product_delivery_charge" value="0" />
        <input
          type="hidden"
          name="success_url"
          value={`${baseUrl}/payment-success`}
        />
        <input
          type="hidden"
          name="failure_url"
          value={`${baseUrl}/payment-failure`}
        />
        <input
          type="hidden"
          name="signed_field_names"
          value="total_amount,transaction_uuid,product_code"
        />
        <input type="hidden" name="signature" value={signature} />
      </form>
    </div>
  );
}
