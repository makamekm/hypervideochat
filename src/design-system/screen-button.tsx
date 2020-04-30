import * as React from 'react';
import { observer } from 'mobx-react';
import { ScreenButtonGenerated } from './screen-button.generated';

export const ScreenButton: typeof ScreenButtonGenerated = observer(props => {
  return <ScreenButtonGenerated {...props} />;
});
