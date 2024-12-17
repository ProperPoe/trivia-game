

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <h1 style={{ textAlign: 'center', color: '#6200ea', margin: '20px 0' }}>
      {title}
    </h1>
  );
}
