type Props = {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  label: string;
}

export const AppInput = (props: Props) => {
  const { value, onChange, placeholder, label } = props;

  return (
    <div>
      <p>{label}</p>
      <input 
        className={"border rounded-2xl h-7 pl-2"}
        value={value} onChange={(e) => onChange(e.target.value)} 
        placeholder={placeholder}
      />
    </div>
  )
}
