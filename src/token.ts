import { Exchange } from "../generated/schema";
import { Transfer } from "../generated/Token/USDT";

export function handleTransfer(event: Transfer): void {
  let transfer = Exchange.load(event.transaction.hash.toHex());
  if (!transfer) {
    transfer = new Exchange(event.transaction.hash.toHex());
  }

  transfer.transferFrom = event.params.from.toHex();
  transfer.transferTo = event.params.to.toHex();
  transfer.amount = event.params.value;
  transfer.blockNumber = event.block.number;

  transfer.save();
}
