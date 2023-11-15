"use client";
import {
  Component3DS,
  PaymentForm,
  CPISessionResponse,
  ResponseCode,
} from "@/components/molecules";

export default function Home() {
  return (
    <main className="container my-12">
      <div className="grid grid-cols-2 gap-8">
        <div>
          {/* <With3DSPaymentForm /> */}
        </div>

        <ResponseCode />
      </div>
    </main>
  );
}
