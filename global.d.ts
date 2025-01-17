// global.d.ts
declare global {
    let mockImport: {
      meta: {
        env: {
          VITE_APP_SERVER_URL: string;
        };
      };
    };
  }
  
  export {}; 
  