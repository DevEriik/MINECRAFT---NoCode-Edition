const FormSelect = ({
    label,
    name,
    value,
    onChange,
    options,
    error,
    borderClass,
}) => {
    return (
        <div className="flex flex-col gap-1">
        <label className="font-extrabold text-lg uppercase text-gray-100 flex flex-wrap items-center justify-between gap-2">
            <span>{label}</span>
            {error && (
            <span className="text-red-400 text-xs normal-case font-bold bg-red-900/30 px-2 py-0.5 rounded border border-red-500/50 text-right ml-auto">
                {error}
            </span>
            )}
        </label>
        <select
            name={name}
            value={value}
            onChange={onChange}
            className={`bg-gray-700 border-4 p-3 outline-none text-white transition-colors ${borderClass}`}
        >
            <option value="">Seleccionar...</option>
            {options.map((opt) => (
            <option key={opt} value={opt}>
                {opt}
            </option>
            ))}
        </select>
        </div>
    );
};

export default FormSelect;
