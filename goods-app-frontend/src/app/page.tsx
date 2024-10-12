import { Col, Row } from 'antd';
import HoverableLink from '@/components/ui/buttons/HoverableLink';
import styles from './styles.module.css';

export default async function Home() {
  return (
    <main className={styles.main}>
      <Row className={styles.row}>
        <Col className={styles.col}>
          <HoverableLink href={`/goods`}>
            <h2>Список товаров</h2>
          </HoverableLink>
        </Col>
        <Col className={styles.col}>
          <div style={{ textAlign: 'center', padding: 20 }}>
            <h2 className={styles.title}>О проекте</h2>
            <p className={styles.text}>
              Проект с функциями управления товарами, позволяющий добавлять, редактировать и удалять
              товары. Также можно просматривать каталог товаров, сортировать и фильтровать их по различным критериям.
            </p>
          </div>
        </Col>
      </Row>
    </main>
  );
}