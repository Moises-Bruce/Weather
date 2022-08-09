import styles from './styles.module.css';

export function Home() {
  return (
    <main className={styles.background}>
      <div className={styles.timeCityToday}>
        <h1>Como está o tempo hoje?</h1>
        <input type="text" placeholder='Digite o nome da cidade'/>
      </div>
    </main>
  )
}