import * as React from 'react';
import { observer } from 'mobx-react';
import { SettingButtonGenerated } from './setting-button.generated';

export const SettingButton: typeof SettingButtonGenerated = observer(props => {
  return <SettingButtonGenerated {...props} />;
});
