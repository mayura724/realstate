import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="relative overflow-hidden">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-slate-950/65" />

      {/* Content */}
      <div className="relative mx-auto flex min-h-[650px] max-w-7xl items-center px-5 py-20 lg:px-8">

        <div className="max-w-3xl">

          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
            ✨ Discover your perfect property
          </div>

          {/* Heading */}
          <h1 className="text-5xl font-black leading-tight tracking-tight text-white md:text-7xl">
            Find a place
            <span className="block text-blue-400">
              you can call home.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 md:text-xl">
            Explore beautiful homes, modern apartments, luxury villas and
            commercial properties in the locations you love.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">

            {/* Explore */}
            <Link
              to="/properties"
              className="rounded-xl bg-blue-600 px-7 py-4 font-bold text-white shadow-xl shadow-blue-600/30 transition hover:-translate-y-1 hover:bg-blue-700"
            >
              🔍 Explore Properties
            </Link>

            {/* List property */}
            <Link
              to="/add-property"
              className="rounded-xl border border-white/30 bg-white/10 px-7 py-4 font-bold text-white backdrop-blur-md transition hover:-translate-y-1 hover:bg-white/20"
            >
              🏠 List Your Property
            </Link>

          </div>

          {/* Stats */}
          <div className="mt-12 flex flex-wrap gap-8">

            <div>
              <p className="text-3xl font-extrabold text-white">
                10K+
              </p>
              <p className="mt-1 text-sm text-slate-300">
                Properties
              </p>
            </div>

            <div className="h-12 w-px bg-white/20" />

            <div>
              <p className="text-3xl font-extrabold text-white">
                5K+
              </p>
              <p className="mt-1 text-sm text-slate-300">
                Happy Clients
              </p>
            </div>

            <div className="h-12 w-px bg-white/20" />

            <div>
              <p className="text-3xl font-extrabold text-white">
                20+
              </p>
              <p className="mt-1 text-sm text-slate-300">
                Locations
              </p>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;