import * as React from 'react';
import { observer } from 'mobx-react';
import { MicOffButtonGenerated } from './mic-off-button.generated';

export const MicOffButton: typeof MicOffButtonGenerated = observer(props => {
  return <MicOffButtonGenerated {...props} />;
});
