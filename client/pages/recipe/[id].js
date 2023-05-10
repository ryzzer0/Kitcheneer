import { useRouter } from 'next/router';
import RecipeDetails from '../../components/RecipeDetails';
import Head from 'next/head';
import { Container, Grid, Col, Paper, Text, Center, Space, Flex, Divider } from '@mantine/core';
import styles from '../../styles/Recipe.module.css';
import Link from 'next/link';


export default function RecipePage() {
  const router = useRouter();
  const { id } = router.query;

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
            <Link href="/">
              <img src="/logo.png" alt="Logo" className={styles.logo}/>
            </Link>
            </Paper>
          </Col>
        </Grid>
      </Container>
      <Divider size="xs" style={{width:'100%'}}/>
      {id && <RecipeDetails id={id} />}
    </div>
  );
}