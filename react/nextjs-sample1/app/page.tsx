"use client";

import React from "react";
import AcmeLogo from "@/app/ui/acme-logo";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import styles from "@/app/ui/home.module.css";
import { TodoList } from "./TodoList";
import { Counter } from "./Counter";
import { RefCounter } from "./RefCounter";
import { Button } from "./Button";
import { Clock } from "./Clock";

export default function Page() {
  const buttonRef = React.useRef<HTMLButtonElement>(null!);

  return (
    <>
      <div>Hoge</div>
      <div>
        Clock
        <Clock />
      </div>
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
        <Button ref={buttonRef} onClick={() => console.log("clicked")}>
          Ref test
        </Button>
      </div>
      <div>
        <TodoList />
      </div>
    </>
  );
}
