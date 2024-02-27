import { memo, useState } from 'react';
import StudyMain from './StudyMain';
import StudySub from './StudySub';

function StartLearn() {
  const [type, setType] = useState(1);
  console.warn(setType);

  return type === 1 ? <StudyMain /> : <StudySub />;
}

export default memo(StartLearn);
