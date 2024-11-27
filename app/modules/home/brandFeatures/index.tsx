const BrandFeatures = () => {
  const features = [
    {
      id: "1",
      title: " Top Brands from Verified Showrooms",
      description:
        "Discover luxury furniture crafted from the finest materials and built to stand the test of time, ensuring lasting beauty in every piece.",
    },
    {
      id: "2",
      title: " Trusted Showrooms",
      description:
        "  Every item comes from certified showrooms known for their excellence, giving you peace of mind with each choice you make",
    },
    {
      id: "3",
      title: "Timeless Design",
      description:
        "Our curated collection balances modern elegance with classic  sophistication, perfect for elevating any space with style and grace.",
    },
  ];

  return (
    <section className="md:py-20 py-10">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">
          Top Brands from Verified Showrooms
        </h2>
        <div className="flex flex-col md:flex-row gap-8 justify-center">
          {features.map((feature) => (
            <div key={feature.id} className=" border rounded-lg p-6 max-w-sm">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandFeatures;
