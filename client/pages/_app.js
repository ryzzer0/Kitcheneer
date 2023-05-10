import "../styles/globals.css";
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { CustomFonts } from '../components/CustomFont';

function MyApp({ Component, pageProps }) {
  return (
    <MantineProvider
    theme={{
      lineHeight: '1.2',
      fontFamily: 'Space Grotesk, sans-serif',
    }}
  >
    <CustomFonts />
    <div className="container">
      <Component {...pageProps} />
    </div>
  </MantineProvider>
  );
}

export default MyApp;