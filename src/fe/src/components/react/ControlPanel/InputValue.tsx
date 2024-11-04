import Input from "@/components/ui/Input";
import SetState from "@/class/Types";

interface InputValueProps {
  title: string;
  placeHolder: string;
  setter: SetState<number>;
}

const InputValue = ({ title, placeHolder, setter }: InputValueProps) => {
  return (
    <div className="w-full px-2 mt-2">
      <p>{title}:</p>
      <Input
        type="number"
        placeholder={placeHolder}
        className="w-full"
        min={1}
        onChange={(event) => {
          setter(parseInt(event.target.value));
        }}
      />
    </div>
  );
};

export default InputValue;
