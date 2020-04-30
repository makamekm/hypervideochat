import * as React from 'react';
import { observer } from 'mobx-react';
import { CamButtonGenerated } from './cam-button.generated';

export const CamButton: typeof CamButtonGenerated = observer(props => {
  return <CamButtonGenerated {...props} />;
});
