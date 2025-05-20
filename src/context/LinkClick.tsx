import React, { createContext, useContext, useEffect } from 'react';

type LinkClickContextType = {
  updateLastLinkClicked: (value: string | undefined) => void;
};

const LinkClickContext = createContext<LinkClickContextType | undefined>(undefined);

export const LinkClickProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const updateLastLinkClicked = (value: string | undefined) => {
    window.lastClickedHref = value
  };

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const link = target.closest('a');

      if (link && link.href) {
        updateLastLinkClicked(link.href);
        console.log('Link click intercepted new:', link.href, window.lastClickedHref);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <LinkClickContext.Provider value={{ updateLastLinkClicked }}>
      {children}
    </LinkClickContext.Provider>
  );
};

export const useLinkClick = () => {
  const context = useContext(LinkClickContext);
  if (!context) {
    throw new Error('useLinkClick must be used within a LinkClickProvider');
  }
  return context;
};
