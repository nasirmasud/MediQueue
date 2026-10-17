export function cn(...inputs) {
  const out = [];
  for (const input of inputs.flat(Infinity)) {
    if (typeof input === "string" && input) out.push(input);
  }
  return out.join(" ");
}

export default cn;
