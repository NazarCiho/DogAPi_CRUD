interface LabelWithInputProps {
    type: string;
    labelText: string;
    name: string;
    value: string;
    onChange: (input: string) => void;
}

const LabelWithInput = ({
    type,
    labelText,
    name,
    value,
    onChange
}: LabelWithInputProps) => {
    return <>
        <label>
            {labelText}:
            <input 
                type={type} 
                name={name} 
                value={value} 
                onChange={(event) => onChange(event.target.value)} />
        </label>
        <br />
    </>
}

export default LabelWithInput