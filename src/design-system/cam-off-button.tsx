import * as React from 'react';
import { observer } from 'mobx-react';
import { CamOffButtonGenerated } from './cam-off-button.generated';

export const CamOffButton: typeof CamOffButtonGenerated = observer(props => {
  return <CamOffButtonGenerated {...props} />;
});
