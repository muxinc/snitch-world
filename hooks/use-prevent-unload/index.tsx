import React from 'react';

const usePreventUnload = () => {
  React.useEffect(() => {
    const onUnload = (event:BeforeUnloadEvent) => {
      event.preventDefault();

      event.returnValue = '';
    }

    window.addEventListener("beforeunload", onUnload);

    return () => window.removeEventListener("beforeunload", onUnload);
  }, []);
};

export default usePreventUnload;
