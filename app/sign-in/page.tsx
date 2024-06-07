import React from 'react';
import { SignInArea } from "@/app/ui/sign-in/sign-in-area";
import { Box, Modal } from '@mui/material';
import { useSignInModal } from '@/app/ui/context/sign-in-modal-context';

export default function SignIn() {
  const { isModalOpen, closeModal } = useSignInModal();

  return (
    <Modal open={isModalOpen} onClose={closeModal}>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <SignInArea />
      </Box>
    </Modal>
  );
}
