import { Box, Text } from "@chakra-ui/react";
import CurrencyLib from "currency.js";
export default function CurrencyAmount({
  currency = "",
  amount,
  align = "left",
  percent = false,
  pr,
  float,
  ...rest
}: Record<string, string | any>) {
  return amount ? (
    //@ts-ignore
    <Box float={float} textAlign={align} {...rest}>
      <Text>
        {currency}{" "}
        {percent
          ? `${CurrencyLib(amount, {
              symbol: "",
            }).format()}%`
          : CurrencyLib(amount, {
              symbol: "",
            }).format()}
      </Text>
    </Box>
  ) : (
    <Text>-</Text>
  );
}
