import { Global } from '@mantine/core';

export function CustomFonts() {
    return (
      <Global
        styles={[
          {
            '@import': "url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap')",
          },
        ]}
      />
    );
  }