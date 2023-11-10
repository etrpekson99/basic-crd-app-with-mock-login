export interface CellTextProps {
  text?: string;
  textColor?: string;
  className?: string;
  isHeader?: boolean;
}

const TableCellText = (props: CellTextProps) => {
  const { text, textColor = 'text-black-100', className = '', isHeader = false } = props;

  return (
    <div data-cell="text" className={`flex items-center ${className}`}>
      <p className={`text-sm truncate ${isHeader ? 'font-bold' : ''} ${textColor}`}>{text}</p>
    </div>
  );
}

export default TableCellText