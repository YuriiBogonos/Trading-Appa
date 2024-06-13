import PasswordComplexityService from '../../../../services/PasswordComplexityService';
import './PasswordStrengthMeter.scss';

const PasswordStrengthMeter = ({ password }: { password: string }) => {
  const strength = PasswordComplexityService.calculatePasswordStrength(password);
  const strengthLabel = PasswordComplexityService.getStrengthLabel(strength);

  const getBarClass = (index: number) => {
    if (index <= strength) {
      switch (strength) {
        case 1:
          return 'weak';
        case 2:
          return 'fair';
        case 3:
          return 'good';
        default:
          return '';
      }
    }
    return '';
  };

  const getStrengthLabelClass = () => {
    switch (strength) {
      case 1:
        return 'weak';
      case 2:
        return 'fair';
      case 3:
        return 'good';
      default:
        return '';
    }
  };

  return (
    <div className='password-strength-meter'>
      <div className='password-strange-bars'>
        <div className={`strength-bar ${getBarClass(1)}`}></div>
        <div className={`strength-bar ${getBarClass(2)}`}></div>
        <div className={`strength-bar ${getBarClass(3)}`}></div>
      </div>
      <div className={`strength-label ${getStrengthLabelClass()}`}>
        <p>{strengthLabel}</p>
      </div>
    </div>
  );
};

export default PasswordStrengthMeter;
