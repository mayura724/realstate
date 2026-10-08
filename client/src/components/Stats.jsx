function Stats() {
  const stats = [
    {
      icon: "🏠",
      number: "10K+",
      label: "Properties Listed",
    },
    {
      icon: "😊",
      number: "5K+",
      label: "Happy Customers",
    },
    {
      icon: "🌎",
      number: "25+",
      label: "Cities Covered",
    },
    {
      icon: "⭐",
      number: "4.9",
      label: "Average Rating",
    },
  ];

  return (
    <section className="bg-white py-16 dark:bg-slate-950">

      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-5 px-5 md:grid-cols-4 lg:px-8">

        {stats.map((stat) => (
          <div
            key={stat.label}
            className="group rounded-2xl border border-slate-200 bg-white p-6 text-center transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/10 dark:border-slate-800 dark:bg-slate-900"
          >

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl transition group-hover:scale-110 dark:bg-blue-500/10">
              {stat.icon}
            </div>

            <p className="mt-4 text-2xl font-extrabold text-slate-900 dark:text-white">
              {stat.number}
            </p>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {stat.label}
            </p>

          </div>
        ))}

      </div>

    </section>
  );
}

export default Stats;