import {
  useState,
} from "react";

import Modal from
  "../common/Modal";

import Button from
  "../ui/Button";

export default function VehicleModal ({
  open,
  onClose,
  onSave,
}) {
  const [form, setForm] =
    useState({
      owner: "",
      number: "",
      model: "",
    });

  const handleSubmit = (
    e
  ) => {
    e.preventDefault();

    onSave(form);

    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
    >

      <h2 className="text-3xl font-bold">
        Register Vehicle
      </h2>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-5"
      >

        <input
          type="text"
          placeholder="Owner Name"
          className="w-full h-12 rounded-2xl border border-gray-200 px-4"
          value={form.owner}
          onChange={(e) =>
            setForm({
              ...form,
              owner:
                e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Vehicle Number"
          className="w-full h-12 rounded-2xl border border-gray-200 px-4"
          value={form.number}
          onChange={(e) =>
            setForm({
              ...form,
              number:
                e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Vehicle Model"
          className="w-full h-12 rounded-2xl border border-gray-200 px-4"
          value={form.model}
          onChange={(e) =>
            setForm({
              ...form,
              model:
                e.target.value,
            })
          }
        />

        <Button
          className="w-full"
          type="submit"
        >
          Save Vehicle
        </Button>

      </form>

    </Modal>
  );
}



