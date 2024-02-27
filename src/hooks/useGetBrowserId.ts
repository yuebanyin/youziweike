// import FingerprintJS from '@fingerprintjs/fingerprintjs';
// import { useState, useEffect } from 'react';
// import { lsGetItem, lsSetItem } from '@/utils';

// export const useGetBrowserId = () => {
//   // 浏览器唯一id
//   const [webkitId, setWebkitId] = useState('');
//   const lsWebkitId = lsGetItem('webkitId');

//   useEffect(() => {
//     if (lsWebkitId) {
//       setWebkitId(lsWebkitId);
//       return;
//     }
//     (async() => {
//       const fp = await FingerprintJS.load();
//       const result = await fp.get();
//       if (result?.visitorId) {
//         setWebkitId(result.visitorId);
//         lsSetItem('webkitId', result.visitorId);
//       }
//     })();
//   }, [lsWebkitId]);

//   return [webkitId];
// };
