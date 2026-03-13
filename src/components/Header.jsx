export default function Header() {
  return (
    <header style={styles.header}>
      <h1 style={styles.title}>📚 Моя библиотека</h1>
    </header>
  );
}

const styles = {
  header: {
    backgroundColor: '#4a6fa5',
    color: 'white',
    padding: '2rem',
    textAlign: 'center',
    marginBottom: '2rem',
    borderRadius: '0 0 20px 20px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  },
  title: {
    margin: 0,
    fontSize: '2.5rem',
  },
  subtitle: {
    margin: '0.5rem 0 0',
    fontSize: '1.1rem',
    opacity: 0.9,
  },
};