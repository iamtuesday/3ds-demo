import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ResponseCPISessionProps {
  operationUrl: string | null;
  setOperationUrl: (operationUrl: string) => void;
  operationSessionId: string | null;
  setOperationSessionId: (operationSessionId: string) => void;
  sessionResponse: string | null;
  setSessionResponse: (sessionResponse: string) => void;
  responseAutheticate: string | null;
  setResponseAutheticate: (responseAutheticate: string) => void;
}

// const ResponseCPISessionStore = create(
//   persist<ResponseCPISessionProps>(
//     (set) => ({
//       operationUrl: null,
//       setOperationUrl: (operationUrl: string) => set({ operationUrl }),
//       operationSessionId: null,
//       setOperationSessionId: (operationSessionId: string) =>
//         set({ operationSessionId }),
//     }),
//     {
//       name: "response-cpi-session-store",
//     }
//   )
// );

const ResponseCPISessionStore = create<ResponseCPISessionProps>((set) => ({
  operationUrl: null,
  setOperationUrl: (operationUrl: string) => set({ operationUrl }),
  operationSessionId: null,
  setOperationSessionId: (operationSessionId: string) =>
    set({ operationSessionId }),
  sessionResponse: null,
  setSessionResponse: (sessionResponse: string) => set({ sessionResponse }),
  responseAutheticate: null,
  setResponseAutheticate: (responseAutheticate: string) =>
    set({ responseAutheticate }),
}));

export default ResponseCPISessionStore;
