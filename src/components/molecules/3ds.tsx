"use client";

import { useEffect, useRef, useState } from "react";
import { apiConfig } from "../../utils/config";

const data = {
  amount: 2874,
  currency: "PEN",
  transactionCategory: "PAYMENT",
  productType: "GOODS_OR_SERVICE_PURCHASE",
  merchant: {
    mid: "4075564",
  },
  paymentForm: {
    pan: "4111111111111111",
    expiryMonth: "05",
    expiryYear: "26",
    networkPreference: "MASTERCARD",
  },
  protocolRequest: {
    name: "THREEDS",
    version: "2",
    challengePreference: "NO_PREFERENCE",
  },
  ianTargetUrl: " https://8757-170-82-98-224.ngrok-free.app/api/auth",
};

export const Component3DS = () => {
  const [operationSessionId, setOperationSessionId] = useState("");
  const [operationUrl, setOperationUrl] = useState("");
  const krAuthenticateRef = useRef<any>(null);

  const createSession = async () => {
    try {
      const res = await apiConfig.post(
        "/PCI/Authentication/CreateSession",
        data
      );

      setOperationSessionId(res.data.answer.operationSessionId);
      setOperationUrl(res.data.answer.operationUrl);
    } catch (error) {
      console.log(error);
    }
  };

  const buildOverlay = () => {
    let overlay = document.createElement("div");
    overlay.setAttribute("id", "overlay");
    overlay.style.backgroundColor = "#D3D3D3";
    overlay.style.height = "100%";
    overlay.style.position = "absolute";
    overlay.style.top = "0";
    overlay.style.opacity = "0.90";
    overlay.style.width = "100%";
    overlay.classList.add(
      "d-flex",
      "justify-content-center",
      "flex-column",
      "align-items-center"
    );
    overlay.innerHTML = `
				 <div class="spinner-border" role="status">
					 <span class="sr-only">Loading...</span>
				 </div>
			  `;
    document.body.appendChild(overlay);
  };

  const authenticateSession = () => {
    /* document.querySelector("#submitButton")?.setAttribute("disabled", "true"); */
    // buildOverlay();

    if (krAuthenticateRef.current) {
      try {
        // krAuthenticateRef.current.authenticate(operationUrl, () => {
        //   /* document.getElementById("overlay")?.remove(); */
        // });
        console.log("krAuthenticateRef.current", krAuthenticateRef.current);

        krAuthenticateRef.current.authenticate(operationUrl, (value: any) => {
          console.log("value", value)
        });

        /* document.querySelector("#submitButton")?.removeAttribute("disabled"); */
      } catch (error) {
        console.error("Authentication error", error);
      }
    }
  };

  const getSession = async () => {
    const res = await apiConfig.post("/PCI/Authentication/GetSession", {
      operationSessionId: operationSessionId,
    });

    console.log("Get Result", res.data);
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://static.micuentaweb.pe/static/js/authenticate-client/V1.0/kr-authenticate.umd.js";
    script.async = true;
    script.onload = () => {
      const publicKey = `${process.env.NEXT_PUBLIC_IZIPAY_USER}:${process.env.NEXT_PUBLIC_KR_PUBLIC_KEY}`;
      console.log("publicKey", publicKey);

      const krAuthInstance = new window.KrAuthenticate(publicKey);

      krAuthenticateRef.current = krAuthInstance;
      /* krAuthInstance?.authenticate(operationUrl, () => {
        console.log("Authentication completed");
      });  */
    };
    document.head.appendChild(script);
  }, [operationUrl]);

  return (
    <div>
      <div className="my-6 text-center flex flex-col gap-4">
      <button
        className="bg-red-600 border border-gray rounded-lg p-2 text-white hover:bg-red-500"
        onClick={createSession}
      >
        Create Session
      </button>

      <div className="my-6">
        {operationSessionId && (
          <div>
            <p>Operation Session Id: {operationSessionId}</p>
            <p>Operation Url: {operationUrl}</p>
          </div>
        )}
      </div>
      </div>

      <div className="my-6 text-center flex flex-col gap-4">
        <h2>Autenticar la sesión</h2>

        <button
          id="submitButton"
          type="submit"
          className="bg-blue-600 border border-gray rounded-lg p-2 text-white hover:bg-blue-500"
          onClick={authenticateSession}
        >
          Authenticate
        </button>
      </div>

      <div className="my-6 text-center flex flex-col gap-4">
        <h2>Obtener el resultado de la autenticación</h2>

        <button
          className="bg-green-600 border border-gray rounded-lg p-2 text-white hover:bg-green-500"
          onClick={getSession}
        >
          Get Session
        </button>
      </div>
    </div>
  );
};
