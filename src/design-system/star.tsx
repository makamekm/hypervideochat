import * as React from 'react';
import { observer } from 'mobx-react';
import { StarGenerated } from './star.generated';

export const Star: typeof StarGenerated = observer(props => {
  return <StarGenerated {...props} />;
});
