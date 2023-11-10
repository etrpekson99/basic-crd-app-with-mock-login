export interface CellButtonProps {
  text: string;
  textColor?: string;
  className?: string;
  onClick?: () => void;
}
const TableCellButton = (props: CellButtonProps) => {
  const { text, textColor = 'text-black-100', className = '', onClick } = props;

  return (
    <button
      data-cell="button"
      type="button"
      onClick={onClick}
      className={`flex items-center ${className}`}
    >
      <p className={`text-sm truncate ${textColor}`}>{text}</p>
    </button>
  );
}

export default TableCellButton;
