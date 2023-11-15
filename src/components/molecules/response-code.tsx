"use client";

import React from "react";
import { CPISessionResponse } from ".";
import ResponseCPISessionStore from "@/store/response-cpi-session.store";
import { Button } from "../ui";
import { apiConfig } from "@/utils/config";

export const ResponseCode = () => {
  const {
    operationUrl,
    operationSessionId,
    responseAutheticate,
    sessionResponse,
    setSessionResponse,
  } = ResponseCPISessionStore();

  /**
   * Get Session
   */

  const getSession = async () => {
    const res = await apiConfig.post("/PCI/Authentication/GetSession", {
      operationSessionId: operationSessionId,
    });

    // setSessionResponse(res.data.answer);
    setSessionResponse(res.data);
  };

  return (
    <div>
      <CPISessionResponse
        operationSessionId={operationSessionId}
        operationUrl={operationUrl}
      />
      <CPISessionResponse responseAutheticate={responseAutheticate} />

      <div className="grid place-content-center my-6">
        <Button onClick={getSession}>Get Session</Button>
      </div>

      <CPISessionResponse sessionResponse={sessionResponse} />
    </div>
  );
};
