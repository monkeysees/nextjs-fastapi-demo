"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Input from "./Input";
import Textarea from "./Textarea";
import FileInput from "./FileInput";
import ErrorAlert from "./ErrorAlert";

export default function BookForm() {
  const router = useRouter();
  const [formValues, setFormValues] = useState<{
    title: string;
    description: string;
    cover: File | undefined;
  }>({
    title: "",
    description: "",
    cover: undefined,
  });
  const [formError, setFormError] = useState<null | string>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", formValues.title);
    formData.append("description", formValues.description);
    if (formValues.cover) {
      formData.append("cover", formValues.cover);
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`, {
      method: "POST",
      body: formData,
    })
      .then((res) => (res.ok ? router.push("/") : setFormError(res.statusText)))
      .catch((e: Error) => setFormError(e.message));
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <Input
          value={formValues.title}
          onChange={(e) =>
            setFormValues({ ...formValues, title: e.target.value })
          }
        />
        <Textarea
          value={formValues.description}
          onChange={(e) =>
            setFormValues({ ...formValues, description: e.target.value })
          }
        />
        <FileInput
          onChange={(e) =>
            setFormValues({ ...formValues, cover: e.target.files?.[0] })
          }
        />
      </div>
      <button className="btn mb-4" type="submit">
        Submit
      </button>
      {formError ? <ErrorAlert message={formError} /> : null}
    </form>
  );
}
