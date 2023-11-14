declare global {
  interface Window {
    KrAuthenticate: KrAuthenticateType;
  }
}

interface KrAuthenticateType {
  (t: any): void;
  addDeviceInformation: (t: any) => void;
  addInstructionResultInformation: (t: any, e: any) => void;
  authenticate: (e: any, t: any) => void;
  executeInstructions: (t: any, e: any, o: any) => void;
  handleAuthenticationSessionResponseAnswer: (t: any, e: any, o: any) => void;
  manageError: (t: any, e: any) => void;
  _buildDeviceBrowserDTO: () => void;
  _buildInstructionResultSessionDTO: (t: any) => void;
}



