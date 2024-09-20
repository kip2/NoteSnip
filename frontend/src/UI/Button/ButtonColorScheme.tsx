import { useColorModeValue } from "@yamada-ui/react";

export const useButtonColorScheme = () => {
    return useColorModeValue("sky", "purple")
} 