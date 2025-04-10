import { useEffect } from "react";
import { useModals, useRouter } from "../../context";

export const useModalRouter = ({
  closeDuration,
  preserveOnRoute,
}: {
  closeDuration: number;
  preserveOnRoute: boolean;
}) => {
  const { updatePath, navigate, path } = useRouter();
  const { modals, setWillBeClosed, setOpen } = useModals();

  useEffect(() => {
    const handlePopState = async (e: PopStateEvent) => {
      if (preserveOnRoute) {
        const hashes = path.split("#");
        const thisModalKey = hashes[hashes.length - 1];
        if (thisModalKey && modals[thisModalKey]) {
          if (modals[thisModalKey].open) {
            e.preventDefault();
            setWillBeClosed(thisModalKey, true);
            await new Promise((res) => setTimeout(res, closeDuration - 100));
            // updatePath();
          }
        }
      }
    };
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [closeDuration, path, preserveOnRoute, modals]);

  useEffect(() => {
    window.addEventListener("hashchange", updatePath);

    return () => {
      window.removeEventListener("hashchange", updatePath);
    };
  }, []);

  return { navigate, path, updatePath };
};
