"use client";

import { Button } from "@/ui";
import {
  faFileDownload,
  faList,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, Variants, motion } from "framer-motion";
import Link from "next/link";
import { useContext, useState } from "react";
import { ScheduleClassesContext } from "../../ScheduleContext";
import download from "./download";
import { getAuth, signOut } from "firebase/auth";
import { app } from "@/backend";
import { useRouter } from "next/navigation";

function BottomMenu() {
  const router = useRouter();
  const currentClasses = useContext(ScheduleClassesContext);

  const [expand, setExpand] = useState(false);

  const buttonVariants: Variants = {
    initial: {
      x: "100%",
      opacity: 0,
    },
    animate: {
      x: "0%",
      opacity: 1,
    },
  };

  return (
    <div className="flex w-full shrink-0 items-center justify-between gap-2 bg-bgPrimary p-2">
      <Link href="/editor/settings" title="reset everything">
        <Button variant="basic">Reset URL</Button>
      </Link>

      <div className="flex shrink-0 items-center gap-4">
        <AnimatePresence>
          {expand === true && (
            <motion.div
              variants={buttonVariants}
              initial="initial"
              animate="animate"
              exit="initial"
              title="download current schedule as Excel"
              onClick={() => {
                download(currentClasses);
              }}
              key="download"
            >
              <Button
                variant="basic"
                className="rounded-none p-0"
                disableBgEffect
              >
                <FontAwesomeIcon icon={faFileDownload} className="h-4" />
              </Button>
            </motion.div>
          )}

          {expand === true && (
            <motion.div
              initial="initial"
              animate="animate"
              exit="initial"
              variants={buttonVariants}
              title="home"
              key="home"
            >
              <Button
                variant="basic"
                className="rounded-none p-0"
                disableBgEffect
                onClick={async () => {
                  const auth = getAuth(app);

                  const user = auth.currentUser;
                  if (user) {
                    await signOut(auth);
                  }

                  router.push("/login");
                }}
              >
                <FontAwesomeIcon icon={faRightFromBracket} className="h-4" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          variant="basic"
          className="rounded-none p-0"
          onClick={() => setExpand(!expand)}
          disableBgEffect
        >
          <FontAwesomeIcon icon={faList} className="h-4" />
        </Button>
      </div>
    </div>
  );
}

export default BottomMenu;
