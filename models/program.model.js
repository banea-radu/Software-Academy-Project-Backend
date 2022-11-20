module.exports = mongoose => {
    const Program = mongoose.model(
        "program-cursuri",
        mongoose.Schema(
            {
                ziua: String,
                ora: String,
                categoria: String
            },
            { timestamps: true }
        ),
        "program-cursuri"
    );

    return Program
}