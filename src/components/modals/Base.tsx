"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import { useModal } from "@/hooks/modal";
import { Suspense } from "react";

const RegisterModal = React.lazy(() => import("./Register"));
const LoginModal = React.lazy(() => import("./Login"));

const Dialog = DialogPrimitive.Root;
const DialogPortal = DialogPrimitive.Portal;
const DialogTitle = DialogPrimitive.Title;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-white/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-auto translate-x-[-50%] translate-y-[-50%] gap-4 backdrop-blur-xs shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    >
      <DialogTitle className="sr-only">Modal</DialogTitle>
      {children}
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

export const ModalProvider = () => {
  const { isOpen, modalType, onClose } = useModal();

  let CurrentModal: React.ComponentType | null = null;

  switch (modalType) {
    case "login":
      CurrentModal = LoginModal as React.ComponentType;
      break;
    case "register":
      CurrentModal = RegisterModal;
      break;
    default:
      CurrentModal = null;
  }

  return (
    <Suspense fallback={null}>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>{CurrentModal && <CurrentModal />}</DialogContent>
      </Dialog>
    </Suspense>
  );
};
