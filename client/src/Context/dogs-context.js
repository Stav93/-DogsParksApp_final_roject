import React from 'react';

const DogsContext = React.createContext({});

const DogsContextProvider = ({children}) => {

    const value = useMemo(() => ({
      dog
    }), [dog]);

    return (
      <DogsContext.Provider value={value}>
        {children}
      </DogsContext.Provider>
    );
  }

  function useDogsContext() {
    return useContext(DogsContext);
  }

  export {
    DogsContextProvider,
    useDogsContext,
  };