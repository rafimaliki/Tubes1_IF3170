interface DataLabelProps {
  label: string;
  value: string | number;
}

const DataLabel = ({ label, value }: DataLabelProps) => {
  return (
    <p className="flex items-start">
      <span className="text-neutral-400 font-light inline-block w-40 align-top">
        {label}
      </span>
      <span className="font-semibold align-top">{value}</span>
    </p>
  );
};

export default DataLabel;
