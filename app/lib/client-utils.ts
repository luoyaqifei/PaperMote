import { SubmissionResult } from "@conform-to/react";
import toast from "react-hot-toast";

export const generateAvatar = (username: string) => {
  return `https://api.dicebear.com/5.x/initials/svg?seed=${username}`;
};

export const setToast = (lastResult: SubmissionResult<string[]> | null) => {
  if (lastResult && "message" in lastResult) {
    if (lastResult.status === "error") {
      toast.error(lastResult.message as string);
    } else {
      toast.success(lastResult.message as string);
    }
  }
};
