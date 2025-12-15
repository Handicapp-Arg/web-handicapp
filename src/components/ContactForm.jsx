import { useState } from "react";
import { Loader2 } from "lucide-react";
import { postContactForm } from "../api";

const ContactForm = ({ t, theme }) => {
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      await postContactForm(form);
      setStatus("success");
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className={`scroll-mt-24 py-20 sm:py-28 md:py-32 lg:py-40 px-4 sm:px-6 relative overflow-hidden border-t ${theme.border}`}>
      <div className={`absolute inset-0 opacity-10 ${theme.accentBg} blur-[150px] sm:blur-[200px]`}></div>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 sm:gap-12 md:gap-16 relative z-10 items-center">
        <div>
          <h2 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter mb-6 sm:mb-8 md:mb-10 leading-[0.9] ${theme.text}`}>
            Empieza gratis <span className={theme.accent}>Hoy</span>
          </h2>
          <p className={`text-base sm:text-lg md:text-xl ${theme.textMuted}`}>{t.contact.subtitle}</p>
        </div>
        <form onSubmit={handleSubmit} className={`p-6 sm:p-8 md:p-10 rounded-xl sm:rounded-2xl md:rounded-[2rem] border ${theme.glass} space-y-4 sm:space-y-6`}>
          <div>
            <label className="text-[10px] sm:text-xs font-bold uppercase opacity-50 mb-1.5 sm:mb-2 block">{t.contact.name}</label>
            <input
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              className={`w-full p-3 sm:p-4 rounded-xl border bg-transparent outline-none text-sm sm:text-base ${theme.border} focus:border-current`}
              required
            />
          </div>
          <div>
            <label className="text-[10px] sm:text-xs font-bold uppercase opacity-50 mb-1.5 sm:mb-2 block">{t.contact.email}</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className={`w-full p-3 sm:p-4 rounded-xl border bg-transparent outline-none text-sm sm:text-base ${theme.border} focus:border-current`}
              required
            />
          </div>
          <div>
            <label className="text-[10px] sm:text-xs font-bold uppercase opacity-50 mb-1.5 sm:mb-2 block">{t.contact.msg}</label>
            <textarea
              name="mensaje"
              rows={4}
              value={form.mensaje}
              onChange={handleChange}
              className={`w-full p-3 sm:p-4 rounded-xl border bg-transparent outline-none text-sm sm:text-base ${theme.border} focus:border-current`}
              required
            />
          </div>
          <button
            disabled={status === "loading"}
            className={`w-full py-4 sm:py-5 rounded-xl font-bold uppercase tracking-widest transition-all hover:scale-105 flex items-center justify-center gap-2 text-sm sm:text-base ${
              status === "success"
                ? "bg-green-500 text-white"
                : "bg-white text-black"
            }`}
          >
            {status === "loading"
              ? <Loader2 className="animate-spin w-4 h-4 sm:w-5 sm:h-5" />
              : status === "success"
              ? t.contact.success
              : t.contact.btn}
          </button>
          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        </form>
      </div>
    </section>
  );
};

export default ContactForm;