import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">

      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-2 lg:grid-cols-4 lg:px-8">

        {/* Brand */}
        <div>

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-xl">
              🏠
            </div>

            <h2 className="text-2xl font-extrabold text-white">
              Estate<span className="text-blue-500">Hub</span>
            </h2>

          </div>

          <p className="mt-5 max-w-sm leading-7 text-slate-400">
            Making it easier to discover, buy, rent and sell properties
            with confidence.
          </p>

        </div>

        {/* Explore */}
        <div>

          <h3 className="mb-5 font-bold text-white">
            Explore
          </h3>

          <div className="flex flex-col gap-3">

            <Link
              to="/properties"
              className="w-fit transition hover:translate-x-1 hover:text-blue-400"
            >
              Properties
            </Link>

            <Link
              to="/favorites"
              className="w-fit transition hover:translate-x-1 hover:text-blue-400"
            >
              Favorites
            </Link>

            <Link
              to="/dashboard"
              className="w-fit transition hover:translate-x-1 hover:text-blue-400"
            >
              Dashboard
            </Link>

          </div>

        </div>

        {/* Company */}
        <div>

          <h3 className="mb-5 font-bold text-white">
            Company
          </h3>

          <div className="flex flex-col gap-3">

            <a href="#" className="w-fit hover:text-blue-400">
              About Us
            </a>

            <a href="#" className="w-fit hover:text-blue-400">
              Contact
            </a>

            <a href="#" className="w-fit hover:text-blue-400">
              Careers
            </a>

          </div>

        </div>

        {/* Contact */}
        <div>

          <h3 className="mb-5 font-bold text-white">
            Contact Us
          </h3>

          <div className="space-y-3">

            <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900 p-3 transition hover:border-blue-600/50">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                📍
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Location
                </p>
                <p className="text-sm font-medium text-slate-200">
                  Addis Ababa, Ethiopia
                </p>
              </div>

            </div>

            <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900 p-3 transition hover:border-blue-600/50">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                ✉️
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Email
                </p>
                <p className="text-sm font-medium text-slate-200">
                  hello@estatehub.com
                </p>
              </div>

            </div>

            <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900 p-3 transition hover:border-blue-600/50">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                📞
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Phone
                </p>
                <p className="text-sm font-medium text-slate-200">
                  +251 900 000 000
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

      <div className="border-t border-slate-800">

        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 px-5 py-6 text-sm text-slate-500 md:flex-row lg:px-8">

          <p>
            © 2026 EstateHub. All rights reserved.
          </p>

          <p>
            Built for modern property discovery.
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;