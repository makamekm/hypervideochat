import * as React from 'react';
import { observer } from 'mobx-react';
import { Logo404Generated } from './logo404.generated';

export const Logo404: typeof Logo404Generated = observer(props => {
  return <Logo404Generated {...props} />;
});
