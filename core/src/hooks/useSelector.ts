import { useSimple } from "./simple"
import { create_CSTU_hooks_InstanceSelector } from "@carefrees/simple-store-utils"
export const createSelectorHook = () => {
  return create_CSTU_hooks_InstanceSelector(useSimple, "listenerSetData")
};
export const useSelector = create_CSTU_hooks_InstanceSelector(useSimple, "listenerSetData")
