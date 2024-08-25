export function SimpleDateTimePicker(props: { value?: Date; onChange: (value: string) => void }) {
  const dateTimeString = props.value
      ? props.value.toISOString().slice(0, 16)
      : "";

  return (
      <input
          type="datetime-local"
          value={dateTimeString}
          onChange={(event) => props.onChange(event.target.value)}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
  );
}
