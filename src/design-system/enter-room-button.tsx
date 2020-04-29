import * as React from 'react';
import { observer } from 'mobx-react';
import { EnterRoomButtonGenerated } from './enter-room-button.generated';

export const EnterRoomButton: typeof EnterRoomButtonGenerated = observer(props => {
  return <EnterRoomButtonGenerated {...props} />;
});
