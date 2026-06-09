const FormInput = ({
    label,
    name,
    type = "text",
    value,
    onChange,
    placeholder,
    error,
    borderClass,
    isTextArea = false,
}) => {
    return (
        <div className="flex flex-col gap-1">
        <label className="font-extrabold text-lg uppercase text-gray-100 flex items-center justify-between">
            <span>{label}</span>
            {error && (
            <span className="text-red-400 text-sm normal-case font-bold bg-red-900/30 px-2 py-0.5 rounded border border-red-500/50 text-right">
                {error}
            </span>
            )}
        </label>
        {isTextArea ? (
            <textarea
            name={name}
            value={value}
            onChange={onChange}
            rows="3"
            placeholder={placeholder}
            className={`bg-gray-700 border-4 p-3 outline-none placeholder-gray-400 resize-none transition-colors ${borderClass}`}
            />
        ) : (
            <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`bg-gray-700 border-4 p-3 outline-none placeholder-gray-400 transition-colors ${borderClass}`}
            />
        )}
        </div>
    );
};

export default FormInput;
