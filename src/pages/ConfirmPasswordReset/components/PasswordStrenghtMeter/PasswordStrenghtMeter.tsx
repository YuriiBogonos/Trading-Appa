import PasswordComplexityService from '../../../../services/PasswordComplexityService.ts';
import './PasswordStrengthMeter.scss';

const PasswordStrengthMeter = ({ password }: { password: string }) => {
  const strength = PasswordComplexityService.calculatePasswordStrength(password);
  const strengthLabel = PasswordComplexityService.getStrengthLabel(strength);

  const getBarClass = (index: number) => {
    if (index < strength) {
      return strengthLabel.toLowerCase(); // This will return 'weak', 'fair', or 'good'
    }
    return '';
  };

  return (
    <div className='password-strength-meter'>
      <div className={`strength-bar ${getBarClass(1)}`}></div>
      <div className={`strength-bar ${getBarClass(2)}`}></div>
      <div className={`strength-bar ${getBarClass(3)}`}></div>
      <div className='strength-label'>
        <p>{strengthLabel}</p>
      </div>
    </div>
  );
};

export default PasswordStrengthMeter;
