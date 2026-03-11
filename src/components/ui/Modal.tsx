"use client";

import { Fragment, type ReactNode } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X } from "lucide-react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "xxl";
};

const sizeMap = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
  xxl: "max-w-6xl"
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "lg",
}: ModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50 " onClose={onClose}>

        {/* Background */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0  bg-black/40 backdrop-blur-sm " />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="scale-95 opacity-0"
            enterTo="scale-100 opacity-100"
            leave="ease-in duration-150"
            leaveFrom="scale-100 opacity-100"
            leaveTo="scale-95 opacity-0"
          >
            <Dialog.Panel
              className={`
                w-full 
                ${sizeMap[size]}  
                rounded-2xl 
                shadow-xl 
                p-0
                 bg-black/60 backdrop-blur-sm 
              `}
            >
              {/* Header */}
              {title && (
                <div
                  className="
        sticky top-0 
        z-10 
        bg-primary 
        p-5
        rounded-t-xl
        flex justify-between items-center
      "
                >
                  <Dialog.Title className="text-2xl font-semibold">
                    {title}
                  </Dialog.Title>

                  <button className="cursor-pointer" onClick={onClose}>
                    <X size={30} />
                  </button>
                </div>
              )}

              {/* Content */}

              <div className="max-h-[75vh] overflow-y-auto no-scrollbar p-6 shadow-inner">
                {children}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}