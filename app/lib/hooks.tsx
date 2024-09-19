import { SubmissionResult } from "@conform-to/react";
import { useEffect } from "react";
import toast from "react-hot-toast";

export function useToast(lastResult: SubmissionResult<string[]> | null) {
    useEffect(() => {
        if (lastResult && 'message' in lastResult) {
          if (lastResult.status === "error") {
            console.log(lastResult.message);
            toast.error(lastResult.message as string);
          } else {
            toast.success(lastResult.message as string);
          }
        }
    }, [lastResult]);
    return null;
}