import Head from 'next/head';
import { Container, Grid, Col, Paper, Text, Center, Space, Flex } from '@mantine/core';
import SearchBar from '../components/SearchBar';
import styles from '../styles/Home.module.css';
import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [isSearchComplete, setIsSearchComplete] = useState(false);
  return (
    <div className={styles.container}>
      <Head>
        <title>Kitcheneer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <Grid>
          <Col span={12}>
            <Paper className={styles.logoWrapper} withoutPadding withoutShadow style={{ backgroundColor: 'transparent' }}>
              <img src="/logo.png" alt="Logo" className={styles.logo} onClick={(e) => { e.preventDefault(); window.location.reload(); }} />
            </Paper>
          </Col>
        </Grid>
      </Container>

      <Center className={styles.titleWrapper}>
        {!isSearchComplete && (
          <>
            <Text align="center" size="64px" weight={700}>
              Find recipes using<br />your <span className={styles.highlight}>ingredients</span>
            </Text>
            <Text align="center" size="20px" weight={300}>
              Say goodbye to wasted food and hello to delicious meals<br />with our easy-to-use recipe search engine.
            </Text>
            <Space h="sm" />
          </>
        )}
        <Flex direction="column" align="center">
          <SearchBar setIsSearchComplete={setIsSearchComplete} />
        </Flex>
      </Center>
    </div>
  );

}