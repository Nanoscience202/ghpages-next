"use client";

import Link from "next/link";
import { Button } from "@/ui";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/backend";
import { useEffect, useState } from "react";

function Navbar({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const [login, setLogin] = useState(true);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setLogin(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div
      className={twMerge(
        className,
        "z-50 box-border flex flex-col gap-4 bg-bgPrimary bg-opacity-50 p-4 backdrop-blur-lg backdrop-filter",
      )}
    >
      <div className="flex items-center justify-between">
        <Link href="/" className="flex h-[40px] items-center gap-4">
          <Image src="/assets/logo.png" alt="Logo" width={36} height={36} />
          <span className="font-heading text-lg md:text-3xl">
            Dream Builder
          </span>
        </Link>

        <div className="flex gap-6">
          {!login && (
            <Link href="/login">
              <Button variant="special">Login</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
