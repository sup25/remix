import { useEffect, useState, FormEvent } from "react";
import { useFetcher } from "@remix-run/react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IProduct } from "~/components/schema/Proudct.schema";

interface CartItem {
  product: IProduct;
  quantity: number;
}

interface FetcherData {
  signature?: string;
  error?: string;
}

interface EsewaPaymentProps {
  amount: number;
  products: CartItem[];
}

export default function Checkout({ amount, products }: EsewaPaymentProps) {
  const fetcher = useFetcher<FetcherData>();
  const [transactionUUID, setTransactionUUID] = useState<string>("");
  const [signature, setSignature] = useState<string>("");
  const [baseUrl, setBaseUrl] = useState<string>("");
  const [isSignatureReady, setIsSignatureReady] = useState(false);

  const taxAmount = Math.round(amount * 0); // Assuming 0% VAT
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
      toast.error("Your cart is empty. Please add items to proceed.");
      return;
    }

    try {
      const newTransactionUUID = generateNewTransactionUUID();
      const formElement = event.target as HTMLFormElement;
      const formData = new FormData(formElement);
      formData.set("transaction_uuid", newTransactionUUID);
      formData.set("cart_data", JSON.stringify(products));

      localStorage.setItem("checkoutSource", "drawer");

      setSignature("");
      setIsSignatureReady(false);

      fetcher.submit(formData, { method: "post", action: "/esewa" });
    } catch (error) {
      console.log(error);
      toast.error("Error processing payment. Please try again.");
    }
  };

  useEffect(() => {
    if (fetcher.data?.signature) {
      setSignature(fetcher.data.signature);
      setIsSignatureReady(true);
    } else if (fetcher.data?.error) {
      toast.error(`Signature generation failed: ${fetcher.data.error}`);
    }
  }, [fetcher.data]);

  useEffect(() => {
    if (isSignatureReady) {
      const esewaForm = document.getElementById("esewaForm") as HTMLFormElement;
      if (esewaForm) {
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
        <input type="hidden" name="product_code" value="EPAYTEST" />
        <input
          type="hidden"
          name="cart_data"
          value={JSON.stringify(products)}
        />
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
          <img src="/esewa.svg" alt="Esewa" className="mr-2 w-[150px] h-auto" />
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
        <input type="hidden" name="product_code" value="EPAYTEST" />
        <input
          type="hidden"
          name="cart_data"
          value={JSON.stringify(products)}
        />
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
