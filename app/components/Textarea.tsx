import { ChangeEvent } from "react";

export default function Textarea({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <label className="form-control">
      <div className="label">
        <span className="label-text text-base font-bold">Description</span>
      </div>
      <textarea
        className="textarea textarea-bordered h-24 text-base"
        placeholder="Type here"
        value={value}
        onChange={onChange}
        required
      ></textarea>
    </label>
  );
}
