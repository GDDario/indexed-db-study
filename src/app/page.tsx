'use client';

import Image from "next/image";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/store/store";
import {increment, updateValue} from "@/store/slices/counterSlice";
import {useEffect, useState} from "react";
import ChatComponent from "@/components/ChatComponent";

export default function Home() {
 const dispatch = useDispatch<AppDispatch>();

  return (
    <div
      className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <ChatComponent />
      </main>
    </div>
  );
}
