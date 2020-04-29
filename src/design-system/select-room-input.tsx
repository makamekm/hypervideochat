import * as React from 'react';
import { observer } from 'mobx-react';
import { SelectRoomInputGenerated } from './select-room-input.generated';

export const SelectRoomInput: typeof SelectRoomInputGenerated = observer(props => {
  return <SelectRoomInputGenerated {...props} />;
});
