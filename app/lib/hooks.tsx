import { SubmissionResult } from "@conform-to/react";
import { useEffect } from "react";
import { setToast } from "./client-utils";

export function useToast(lastResult: SubmissionResult<string[]> | null) {
    useEffect(() => {
        setToast(lastResult);
    }, [lastResult]);
    return null;
}