import { Input, InputField } from "@/components/ui/input";
	
export default function SearchBar() {
  return (
    <Input variant="rounded" size="md" isDisabled={false} isInvalid={false} isReadOnly={false} >
          <InputField
            placeholder='Enter Text here...'
          />
        </Input>
  );
}