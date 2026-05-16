"use client";
import React, { useState, FormEvent } from "react";
import { CalendarCheck, Phone } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { SectionHeading } from "@/components/ui/SectionHeading";

const DEVICE_ID_STORAGE_KEY = "device_id";

function getOrCreateDeviceId() {
  if (typeof window === "undefined") return "";

  const existing = window.localStorage.getItem(DEVICE_ID_STORAGE_KEY);
  if (existing) return existing;

  const generated =
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `device-${Date.now()}-${Math.random().toString(16).slice(2)}`;

  window.localStorage.setItem(DEVICE_ID_STORAGE_KEY, generated);
  return generated;
}

const appointmentFormSchema = z.object({
  name: z
    .string({ error: "Full name is required" })
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),
  phone: z
    .string({ error: "Phone number is required" })
    .trim()
    .regex(/^(\+8801|01)[3-9]\d{8}$/, "Enter a valid Bangladeshi phone number"),
  age: z.coerce.number({ error: "Age is required" }).int().min(0).max(130),
  message: z
    .string()
    .trim()
    .max(500, "Message cannot exceed 500 characters")
    .optional(),
});

type FormFieldErrors = Partial<Record<keyof FormState, string>>;

interface FormState {
  age: string;
  name: string;
  phone: string;
  message: string;
}

const initialForm: FormState = {
  name: "",
  phone: "",
  message: "",
  age: "",
};

export function AppointmentSection() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormFieldErrors>({});
  const [errorMessage, setErrorMessage] = useState("");
  const [bookingNumber, setBookingNumber] = useState<number | null>(null);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("idle");
    setErrorMessage("");
    setBookingNumber(null);

    const parsed = appointmentFormSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: FormFieldErrors = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as keyof FormState | undefined;
        if (field && !fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }
      setErrors(fieldErrors);
      setStatus("error");
      return;
    }

    setErrors({});
    setStatus("loading");

    const trimmedMessage = parsed.data.message?.trim();

    const payload = {
      patientName: parsed.data.name,
      phone: parsed.data.phone,
      age: parsed.data.age,
      message: trimmedMessage ? trimmedMessage : undefined,
    };

    const deviceId = getOrCreateDeviceId();

    try {
      const res = await fetch(`/api/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Device-ID": deviceId,
        },
        body: JSON.stringify(payload),
      });

      const data: {
        success?: boolean;
        message?: string;
        data?: { serialNumber?: number };
      } = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.message || "Failed to submit appointment request");
        setStatus("error");
        return;
      }

      setStatus("success");
      setBookingNumber(data.data?.serialNumber ?? null);
      setForm(initialForm);
    } catch {
      setErrorMessage("Network error. Please try again.");
      setStatus("error");
    }
  };

  return (
    <section
      id="appointment"
      className="section-padding bg-(--color-surface-light)"
    >
      <div className="container-site">
        <SectionHeading
          label="Book Appointment"
          title="Schedule Your Consultation"
          subtitle="Fill in the form below or call us directly. We'll confirm your appointment within 2 hours."
          className="mb-12"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Form */}
          <div className="card p-8">
            {status === "success" ? (
              <div className="flex flex-col items-center text-center gap-4 py-8! justify-end">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(130,180,64,0.15)" }}
                >
                  <CalendarCheck
                    size={32}
                    style={{ color: "var(--color-accent)" }}
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-heading-lg text-(--color-primary)">
                  Appointment Requested!
                </h3>

                {bookingNumber ? (
                  <p className="text-body-lg font-bold text-(--color-primary)">
                    Your booking number is <strong>#{bookingNumber}</strong>.
                  </p>
                ) : null}
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                aria-label="Appointment booking form"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4! mt-4!">
                  {/* Name */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="name"
                      className="block text-body-sm font-medium text-(--color-text-primary) mb-1.5"
                    >
                      Full Name{" "}
                      <span aria-hidden="true" className="text-red-500">
                        *
                      </span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      className="input"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={handleChange}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-body-sm font-medium text-(--color-text-primary) mb-1.5"
                    >
                      Phone Number{" "}
                      <span aria-hidden="true" className="text-red-500">
                        *
                      </span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      className="input"
                      placeholder="01XXXXXXXXX"
                      value={form.phone}
                      onChange={handleChange}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* age */}
                  <div>
                    <label
                      htmlFor="age"
                      className="block text-body-sm font-medium text-(--color-text-primary) mb-1.5"
                    >
                      Age{" "}
                      <span aria-hidden="true" className="text-red-500">
                        *
                      </span>
                    </label>
                    <input
                      id="age"
                      name="age"
                      type="number"
                      required
                      className="input"
                      placeholder="Your age"
                      value={form.age}
                      onChange={handleChange}
                    />
                    {errors.age && (
                      <p className="mt-1 text-sm text-red-600">{errors.age}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="message"
                      className="block text-body-sm font-medium text-(--color-text-primary) mb-1.5"
                    >
                      Message (optional)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      className="input resize-none"
                      placeholder="Briefly describe your symptoms or concern..."
                      value={form.message}
                      onChange={handleChange}
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.message}
                      </p>
                    )}
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={status === "loading"}
                  className="w-full mt-6 justify-center"
                  icon={<CalendarCheck size={18} aria-hidden="true" />}
                >
                  {status === "loading" ? "Booking..." : "Make Appointment"}
                </Button>
                {status === "error" && errorMessage && (
                  <p className="my-3! px-4! text-sm text-red-600" role="alert">
                    {errorMessage}
                  </p>
                )}
              </form>
            )}
          </div>

          {/* Info panel */}
          <div className="flex flex-col gap-6">
            <div className="rounded-2xl overflow-hidden shadow-(--shadow-md) aspect-video">
              <PlaceholderImage
                width={600}
                height={340}
                label="Daktar Khana — Consultation Room"
                variant="medical"
              />
            </div>

            <div
              className="rounded-2xl p-6! text-white flex flex-col gap-4"
              style={{ background: "var(--color-primary)" }}
            >
              <h3 className="text-heading-md text-white">
                We Are Here For You
              </h3>
              <p className="text-body-sm text-white/75">
                Need immediate assistance? Call our appointment line directly.
                Dr. Tirthankar sees patients 6 days a week.
              </p>
              <a
                href="tel:01312612890"
                className="flex items-center gap-3 mt-2 group"
                aria-label="Call 01312-612890"
              >
                <div className="w-12 h-12 rounded-xl bg-(--color-accent) flex items-center justify-center shrink-0">
                  <Phone size={20} className="text-white" aria-hidden="true" />
                </div>
                <div>
                  <span className="block text-body-xs text-white/60">
                    Appointment Line
                  </span>
                  <span className="block text-heading-md text-white group-hover:text-(--color-accent) transition-colors">
                    01312-612890
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
