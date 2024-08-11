"use client";

import React from "react";
import AcmeLogo from "@/app/ui/acme-logo";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import styles from "@/app/ui/home.module.css";
import { TodoList } from "./TodoList";
import { Counter } from "./Counter";
import { RefCounter } from "./RefCounter";

export default function Page() {
  return (
    <>
      <div>Hoge</div>
      <div>
        Counter1: <Counter />
      </div>
      <div>
        Counter2: <Counter />
      </div>
      <div>
        RefCounter: <RefCounter />
      </div>
      <div>
        <TodoList />
      </div>
    </>
  );
}
