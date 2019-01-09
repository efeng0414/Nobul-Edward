export const passProps = ({ fn, props }) => originalParams =>
  fn({
    ...props,
    ...originalParams
  });
