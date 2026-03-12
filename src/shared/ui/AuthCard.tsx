import Card from '@mui/material/Card';

interface AuthCardProps {
  children: React.ReactNode;
}

export const AuthCard = ({ children }: AuthCardProps) => {
  return (
    <Card
      sx={{
        minWidth: '527px',
        minHeight: 724,
        boxShadow: '0px 24px 32px 0px rgba(0, 0, 0, 0.04)',
        background: 'rgba(255, 255, 255, 1)',
        borderRadius: '34px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Card
        sx={{
          minWidth: 515,
          minHeight: 700,
          borderRadius: '34px',
          background:
            'linear-gradient(180.00deg, rgba(35, 35, 35, 0.03) 0%,rgba(35, 35, 35, 0) 50%)',
          boxShadow: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingTop: '48px',
          paddingBottom: '48px',
        }}
      >
        {children}
      </Card>
    </Card>
  );
};
