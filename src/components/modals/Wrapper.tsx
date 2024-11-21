"use client";

import { useModal } from "@/hooks/modal";
import dynamic from "next/dynamic";

const ModalProvider = dynamic(
  () => import("@/components/modals/Base").then((mod) => mod.ModalProvider),
  { ssr: false }
);

export default function ModalContainer() {
  const { modalType } = useModal();

  return modalType && <ModalProvider />;
}
