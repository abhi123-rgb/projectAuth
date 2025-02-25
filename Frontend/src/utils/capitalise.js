export function capitalise(value) {
  if (value) {
    const data = value.split("")[0].toUpperCase();
    return data + value.slice(1);
  }
}
