import * as React from 'react';

const defaultApi: any = {
  events: [] as any[],
  prodMode: false as boolean,
  setProdMode: (_mode: boolean) => null,
  clearEvents: () => null,
  addEvent: (_source: string, _data: any) => null,
};

export type AppContextApi = typeof defaultApi;

export const AppContext: React.Context<AppContextApi> = React.createContext<AppContextApi>(defaultApi);

/**
 * App provider.
 */
export const AppProvider = ({ children }: any) => {

  const [ prodMode, setProdMode ] = React.useState<boolean>(false);
  const [ events, setEvents ] = React.useState<any[]>(defaultApi.events);

  const clearEvents = () => {
    setEvents([]);
  };

  const addEvent = (_source: string, _data: any) => {
    setEvents((prevEvents: any[]) => ( [ { date: new Date(), source: _source, data: _data }, ...prevEvents ] ));
  };

  return (
    <AppContext.Provider
      value={ {
        events,
        prodMode,
        setProdMode,
        clearEvents,
        addEvent,
      } as AppContextApi }>
      { children }
    </AppContext.Provider>
  );
};

export function useApp() {
  return React.useContext(AppContext);
}
