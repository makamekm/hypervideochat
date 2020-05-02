import * as React from 'react';
import { observer } from 'mobx-react';
import { StarFillGenerated } from './star-fill.generated';

export const StarFill: typeof StarFillGenerated = observer(props => {
  return <StarFillGenerated {...props} />;
});
