import React from "react";
import { Clock, MapPin, Phone } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

const schedule = [
  { day: "Saturday", time: "11:00 AM – 11:00 PM", open: true },
  { day: "Sunday", time: "11:00 AM – 11:00 PM", open: true },
  { day: "Monday", time: "11:00 AM – 11:00 PM", open: true },
  { day: "Tuesday", time: "11:00 AM – 11:00 PM", open: true },
  { day: "Wednesday", time: "11:00 AM – 11:00 PM", open: true },
  { day: "Thursday", time: "11:00 AM – 11:00 PM", open: true },
  { day: "Friday", time: "Closed", open: false },
];

const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

export function ScheduleSection() {
  return (
    <section id="schedule" className="section-padding bg-(--color-surface-dark)">
      <div className="container-site">
        <SectionHeading
          label="Opening Hours"
          title="Clinic Schedule & Location"
          subtitle="Dr. Tirthankar is available 6 days a week at Daktar Khana, Moulvibazar."
          inverted
          className="mb-12"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Schedule table */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl overflow-hidden border border-white/10">
              <div className="grid grid-cols-2 px-6! py-3! bg-white/5">
                <span className="text-label text-white/50">Day</span>
                <span className="text-label text-white/50">Hours</span>
              </div>
              {schedule.map((item) => {
                const isToday = today === item.day;
                return (
                  <div
                    key={item.day}
                    className={`grid grid-cols-2 px-1! py-3! lg:px-6! lg:py-4! border-t border-white/10 transition-colors ${
                      isToday ? "bg-(--color-accent)/15" : "hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-body-md font-medium ${
                          item.open ? "text-white" : "text-white/40"
                        }`}
                      >
                        {item.day}
                      </span>
                      {isToday && (
                        <span className="badge-accent badge text-[10px] py-0.5">Today</span>
                      )}
                    </div>
                    <span
                      className={`text-body-md flex items-center gap-2 ${
                        item.open ? "text-(--color-accent)" : "text-white/40"
                      }`}
                    >
                      {item.open && <Clock size={14} aria-hidden="true" />}
                      {item.time}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Location card */}
          <div className="flex flex-col gap-4">
            <div
              className="rounded-2xl p-6! flex flex-col gap-5"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <h3 className="text-heading-md text-white">Find Us</h3>

              <address className="not-italic flex flex-col gap-4">
                <div className="flex gap-3">
                  <MapPin size={18} className="text-(--color-accent) mt-0.5 shrink-0" aria-hidden="true" />
                  <div className="text-body-sm text-white/70">
                    <strong className="text-white block mb-0.5">Daktar Khana Clinic</strong>
                    Chowmohona, Shomshernagar Road<br />
                    Moulvibazar, Sylhet, Bangladesh
                  </div>
                </div>

                <div className="flex gap-3">
                  <Phone size={18} className="text-(--color-accent) mt-0.5 shrink-0" aria-hidden="true" />
                  <div className="text-body-sm text-white/70">
                    <strong className="text-white block mb-0.5">Appointment Line</strong>
                    <a href="tel:01312612890" className="hover:text-(--color-accent) transition-colors">
                      01312-612890
                    </a>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Clock size={18} className="text-(--color-accent) mt-0.5 shrink-0" aria-hidden="true" />
                  <div className="text-body-sm text-white/70">
                    <strong className="text-white block mb-0.5">Clinic Hours</strong>
                    Saturday – Thursday: 11 AM – 11 PM<br />
                    Friday: Closed
                  </div>
                </div>
              </address>

              <Button as="link" href="#appointment" variant="primary" size="md" className="mt-2">
                Book Now
              </Button>
            </div>

            {/* Emergency note */}
            <div
              className="rounded-2xl p-4! text-center"
              style={{ background: "rgba(130,180,64,0.12)", border: "1px solid rgba(130,180,64,0.25)" }}
            >
              <p className="text-body-sm text-white/80">
                🚨 <strong className="text-white">Emergency?</strong> Call{" "}
                <a href="tel:01312612890" className="text-(--color-accent) font-semibold hover:underline">
                  01312-612890
                </a>{" "}
                for urgent assistance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
