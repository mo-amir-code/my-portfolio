import { Input } from "@/components/ui/input";
import { LensIcon } from "../../icons";

export type InputFieldType = {
  type: string;
  placeholder?: string;
  icon: "search";
};

const InputField = ({ type, placeholder }: InputFieldType) => {
  return (
    <div className="relative w-full">
      <Input type={type} placeholder={placeholder} className="w-full" />
      <span className="absolute top-1/2 -translate-y-1/2 right-2" >
        <LensIcon className="w-4" />
      </span>
    </div>
  );
};

export default InputField;
