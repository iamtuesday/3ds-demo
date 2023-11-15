import React, { FC } from "react";

interface Props {
  operationUrl?: string | null;
  operationSessionId?: string | null;
  responseAutheticate?: any;
  sessionResponse?: any;
}
export const CPISessionResponse: FC<Props> = ({
  operationUrl,
  operationSessionId,
  responseAutheticate,
  sessionResponse,
}) => {
  return (
    <pre className="mt-2 rounded-md bg-slate-950 p-4 overflow-x-auto text-sm">
      {operationSessionId && operationUrl && (
        <div>
          <p className="text-white">
            Operation Session Id: {operationSessionId}
          </p>
          <p className="text-white">Operation Url: {operationUrl}</p>
        </div>
      )}

      {responseAutheticate && (
        <code className="text-white">{JSON.stringify(responseAutheticate, null, 2)}</code>
      )}
      
      {sessionResponse && (
        <code className="text-white">{JSON.stringify(sessionResponse, null, 2)}</code>
      )}
    </pre>
  );
};
