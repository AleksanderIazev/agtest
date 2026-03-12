import { useForm, Controller } from 'react-hook-form';
import { AuthCard } from '../../../shared/ui/AuthCard';
import { AuthFormInput } from '../../../shared/ui/AuthFormInput';
import { CheckboxRemember } from '../../../shared/ui/CheckboxRemember';
import { AuthSubmitButton } from '../../../shared/ui/AuthSubmitButton';
import { AuthDivider } from '../../../shared/ui/AuthDivider';
import { AuthSignUpLink } from '../../../shared/ui/AuthSignUpLink';
import circleLogo from '../../../shared/icons/circleLogo.svg';
import { AuthWelcomeTitle } from '../../../shared/ui/AuthWelcomeTitle';
import { AuthSubtitle } from '../../../shared/ui/AuthSubtitle';
import { useAuth } from '../../../shared/lib/AuthContext';
import styles from './Auth.module.scss';

const flexColumn = { display: 'flex' as const, flexDirection: 'column' as const };
const flexColumnCenter = { ...flexColumn, alignItems: 'center' as const };
const flexColumnCenterGap = { ...flexColumnCenter, gap: '12px' };

interface AuthFormValues {
  username: string;
  password: string;
  remember: boolean;
}

export const Auth = () => {
  const { login, error: apiError, clearError, isLoading } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormValues>({
    defaultValues: {
      username: '',
      password: '',
      remember: false,
    },
  });

  const onSubmit = (data: AuthFormValues) => {
    clearError();
    login(data.username, data.password, data.remember);
  };

  return (
    <AuthCard>
      <form onSubmit={handleSubmit(onSubmit)} style={flexColumn}>
        <img src={circleLogo} alt="logo" style={{ display: 'block', height: '80px' }} />
        <div style={{ ...flexColumnCenter, marginTop: '4px' }}>
          <AuthWelcomeTitle />
          <AuthSubtitle />
        </div>
        <div style={flexColumnCenterGap}>
          <Controller
            name="username"
            control={control}
            rules={{ required: 'Поле обязательно для заполнения' }}
            render={({ field }) => (
              <AuthFormInput
                variant="login"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={errors.username?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{ required: 'Поле обязательно для заполнения' }}
            render={({ field }) => (
              <AuthFormInput
                variant="password"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={errors.password?.message}
              />
            )}
          />
        </div>
        <Controller
          name="remember"
          control={control}
          render={({ field }) => (
            <CheckboxRemember checked={field.value} onChange={field.onChange} />
          )}
        />
        {apiError && <p className={styles.apiError}>{apiError}</p>}
        <AuthSubmitButton disabled={isLoading} />
        <AuthDivider />
        <AuthSignUpLink />
      </form>
    </AuthCard>
  );
};
