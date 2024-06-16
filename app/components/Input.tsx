import { ChangeEvent } from "react";

export default function Input({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text text-base font-bold">Title</span>
      </div>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered w-full max-w-xs"
        value={value}
        onChange={onChange}
        required
      />
    </label>
  );
}
