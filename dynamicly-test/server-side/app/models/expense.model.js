module.exports = (mongoose) => {
  const expense = mongoose.model(
    "expense",
    mongoose.Schema(
      {
        title: String,
        amount: Number,
      },
      { timestamps: true }
    )
  );

  return expense;
};
