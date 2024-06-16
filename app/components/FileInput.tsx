import { ChangeEvent } from "react";

export default function FileInput({
  onChange,
}: {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text text-base font-bold">Cover image</span>
      </div>
      <input
        type="file"
        className="file-input file-input-bordered w-full max-w-xs"
        onChange={onChange}
        required
      />
    </label>
  );
}
