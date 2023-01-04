import { NormalizedTuple } from "@/components/input-select";

export const normalizeItems = (item:MediaDeviceInfo) => [item.deviceId, item.label] as NormalizedTuple;
