import * as React from 'react';
import { observer } from 'mobx-react';
import { MicButtonGenerated } from './mic-button.generated';

export const MicButton: typeof MicButtonGenerated = observer(props => {
  return <MicButtonGenerated {...props} />;
});
