interface DataLabelProps {
  label: string;
  value: string | number;
}

const DataLabel = ({ label, value }: DataLabelProps) => {
  return (
    <p>
      <span className="text-neutral-400 font-light inline-block w-40">
        {label}
      </span>
      <span className="font-semibold">{value}</span>
    </p>
  );
};

export default DataLabel;
