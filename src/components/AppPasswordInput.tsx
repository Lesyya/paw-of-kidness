import React, { useState } from 'react';
import Icon from '@mdi/react';
import { mdiEye, mdiEyeOff } from '@mdi/js';

import AppButton from './AppButton';
import AppInput from './AppInput';
import { cn } from '@/utils';

import type { AppInputProps } from './AppInput';

const AppPasswordInput = React.forwardRef<HTMLInputElement, AppInputProps>(({ className, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const disabled = props.value === '' || props.value === undefined || props.disabled;

  return (
    <div className="relative">
      <AppInput
        type={showPassword ? 'text' : 'password'}
        className={cn('hide-password-toggle pr-10', className)}
        ref={ref}
        {...props}
      />
      <AppButton
        type="button"
        variant="ghost"
        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
        onClick={() => setShowPassword(prev => !prev)}
        disabled={disabled}
      >
        {showPassword && !disabled ? (
          <Icon path={mdiEye} size="24px" aria-hidden="true" />
        ) : (
          <Icon path={mdiEyeOff} size="24px" aria-hidden="true" />
        )}
      </AppButton>
    </div>
  );
});

AppPasswordInput.displayName = 'PasswordInput';

export default AppPasswordInput;
