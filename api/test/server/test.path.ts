import { AHandler } from "@napp/api-server";
import { metaTestpath } from "test/meta.testpath";

export const testPath1 = new AHandler(metaTestpath.meta1, {
    action: async ({ a, b, c }) => {
        return {
            ab: `r=${a}-${b}-${c}`
        }
    }
});

export const testPath2 = new AHandler(metaTestpath.meta2, {
    action: async ({ a, b, c }) => {
        return {
            ab: `r=${a}-${b}-${c}`
        }
    }
});