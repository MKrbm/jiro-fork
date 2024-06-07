"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SignInModalContextType {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const SignInModalContext = createContext<SignInModalContextType | undefined>(undefined);

export const SignInModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    console.log("openModal called");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log("closeModal called");
    setIsModalOpen(false);
  };

  return (
    <SignInModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {children}
    </SignInModalContext.Provider>
  );
};

export const useSignInModal = () => {
  const context = useContext(SignInModalContext);
  if (!context) {
    throw new Error('useSignInModal must be used within a SignInModalProvider');
  }
  return context;
};
