/* declare function KrAuthenticate(param: any): void;
 */



interface Window {
    KrAuthenticate?: {
      addDeviceInformation(): void;
      addInstructionResultInformation(t: any, e: any): void;
      authenticate(e: any, t: any): void;
      executeInstructions(t: any, e: any, o: any): void;
      handleAuthenticationSessionResponseAnswer(t: any, e: any, o: any): void;
      manageError(t: any, e: any): void;
      _buildDeviceBrowserDTO(): void;
      _buildInstructionResultSessionDTO(t: any): void;
    };
  }
  
  declare var KrAuthenticate: {
    prototype: Window['KrAuthenticate'];
    new (t: any): Window['KrAuthenticate'];
  };
  