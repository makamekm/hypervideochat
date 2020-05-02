import * as React from 'react';
import { observer } from 'mobx-react';
import { CallOffButtonGenerated } from './call-off-button.generated';

export const CallOffButton: typeof CallOffButtonGenerated = observer(props => {
  return <CallOffButtonGenerated {...props} />;
});
