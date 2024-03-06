declare global {
  interface Window {
    ChannelIO: any;
    ChannelIOInitialized: any;
    DetectDatalayer: boolean;
  }

  const IMP: any;
}

// If your module exports nothing, you'll need this line. Otherwise, delete it
export {};
