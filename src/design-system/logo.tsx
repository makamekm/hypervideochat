import * as React from 'react';
import { observer } from 'mobx-react';
import { LogoGenerated } from './logo.generated';

export const Logo: typeof LogoGenerated = observer(props => {
  return <LogoGenerated {...props} />;
});
