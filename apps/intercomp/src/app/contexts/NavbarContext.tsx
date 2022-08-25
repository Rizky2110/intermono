import React, { createContext, useContext, useState } from "react";

const NavbarController = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isHide, setIsHide] = useState<boolean>(false);

  return {
    isOpen,
    isHide,
    setIsOpen,
    setIsHide,
  };
};

const NavbarContext = createContext<ReturnType<typeof NavbarController>>({
  isOpen: true,
  setIsOpen: () => {},
  isHide: false,
  setIsHide: () => {},
});

interface NavbarContextProviderProps {
  children: React.ReactNode;
}

export const NavbarContextProvider: React.FC<NavbarContextProviderProps> =
  function NavbarContextProvider({ children }: NavbarContextProviderProps) {
    return (
      <NavbarContext.Provider value={NavbarController()}>
        {children}
      </NavbarContext.Provider>
    );
  };

export const useNavbar = () => useContext(NavbarContext);
