interface SnackbarProps {
  message: string;
}

const Snackbar = (props: SnackbarProps) => {
  const { message } = props;

  return (
    <div
      className="py-3 px-6 flex items-center bg-red-500 rounded-lg"
      data-testid="snackbar"
    >
      <p className="text-white">{message}</p>
    </div>
  );
}

export default Snackbar;