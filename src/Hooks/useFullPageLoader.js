import React from 'react';
import FullPageLoader from '../components/Loading';

const useFullPageLoader = () => {
  const [loading, setLoading] = React.useState(false);

  return [
    loading ? <FullPageLoader /> : null,
    () => setLoading(true), //Show loader
    () => setLoading(false), //Hide Loader
  ];
};

export default useFullPageLoader;
